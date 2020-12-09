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

## 2. 获取不到值

在ParameterDecorator中，第二个参数是propertyKey，但是在实际情况下这个值是undefined。

