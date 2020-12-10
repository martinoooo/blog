# TS-Decorator

关于typescript decorator的使用，就不在本文中赘述了，这里主要记录了下本人在使用decorator中所产生的想法与遇到的一些问题。

## 1. target类型

首先，decorator一共有class，method，accessor，property，parameter这5种类型。其中method和accesor decorator的定义是一样的。

```typescript
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
```

看定义的话，可以看出来后面3种的target都是object，官方的文档的描述是这样子的：Either the constructor function of the class for a static member, or the prototype of the class for an instance member。

有点绕，看个例子。



```typescript
function classDec(): ClassDecorator {
  return function (target) {
    console.log('classDec', target);
  };
}

function propertyDec(): PropertyDecorator {
  return function (target, propertyKey) {
    console.log('propertyDec', target);
  };
}

function methodDec(): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    console.log('methodDec', target);
  };
}

function parmaDec(): ParameterDecorator {
  return function (target, propertyKey, parameterIndex) {
    console.log('parmaDec', target);
  };
}

@classDec()
class Test {
  @propertyDec()
  greeting: string;

  constructor(@parmaDec() old: string) {}

  @methodDec()
  greet(@parmaDec() pram: string) {
    return this.greeting;
  }
}

```

可以看到输出 propertyDec 和 methodDec 都是 Test {}， 而parmaDec和classDec 都是 [Function: Test]。

这是因为在js中，class也是以原型链的形式，可以说是构造函数的一种语法躺表示。所以写成一般的构造函数的话，就会变成：

```typescript
function Test(*old*) {
}
Test.prototype.greeting = undefined;
Test.prototype.greet = function() {return this.greeting}
```

因此propertyDec 和 methodDec 装饰的对象是prototype，所以返回的就是这个class的prototype，而parmaDec和classDec装饰的对象是这个函数，因此就会返回这个函数对象。

特别的是ParameterDecorator可以装饰方法的参数，也可以装饰constructor，因此参数里面的target也是不一样的。

所以只需要记住一个点，就是这个装饰器所装饰究竟是什么对象，那么这个接受的target是什么就很容易就可以知道了。

## 2. 获取不到值

在ParameterDecorator中，第二个参数是propertyKey，但是在实际情况下这个值是undefined。

