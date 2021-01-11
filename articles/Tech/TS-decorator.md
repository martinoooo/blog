# TS-Decorator

关于 typescript decorator 的使用，就不在本文中赘述了，这里主要记录了下本人在使用 decorator 中所产生的想法与遇到的一些问题。

## 1. target 类型

首先，decorator 一共有 class，method，accessor，property，parameter 这 5 种类型。其中 method 和 accesor decorator 的定义是一样的。

```typescript
declare type ClassDecorator = <TFunction extends Function>(
  target: TFunction,
) => TFunction | void;
declare type PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol,
) => void;
declare type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
) => void;
```

看定义的话，可以看出来后面 3 种的 target 都是 object，官方的文档的描述是这样子的：Either the constructor function of the class for a static member, or the prototype of the class for an instance member。

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

可以看到输出 propertyDec 和 methodDec 都是 Test {}， 而 parmaDec 和 classDec 都是 [Function: Test]。

这是因为在 js 中，class 也是以原型链的形式，可以说是构造函数的一种语法躺表示。所以写成一般的构造函数的话，就会变成：

```typescript
function Test(*old*) {
}
Test.prototype.greeting = undefined;
Test.prototype.greet = function() {return this.greeting}
```

因此 propertyDec 和 methodDec 装饰的对象是 prototype，所以返回的就是这个 class 的 prototype，而 parmaDec 和 classDec 装饰的对象是这个函数，因此就会返回这个函数对象。

特别的是 ParameterDecorator 可以装饰方法的参数，也可以装饰 constructor，因此参数里面的 target 也是不一样的。

所以只需要记住一个点，就是这个装饰器所装饰究竟是什么对象，那么这个接受的 target 是什么就很容易就可以知道了。

## 2. 获取不到值

在 ParameterDecorator 中，第二个参数是 propertyKey，但是在实际情况下这个值是 undefined。

## 3

循环引用的情况下，一个可以通过 design:type 获取到 inject 的 type，另外一个则是 undefined
