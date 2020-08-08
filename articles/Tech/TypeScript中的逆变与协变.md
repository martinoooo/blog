TypeScript类型系统的中的逆变与协变概念出现在文档中的类型兼容性一章，个人觉得概念比较绕，查阅了一些文档，有了一些大概的了解。

首先逆变协变是由子类型衍生出来的一个概念，什么是子类型呢，根据维基百科的描述：

> 在多数基于类的[面向对象编程语言](https://zh.wikipedia.org/wiki/面向对象编程语言)中，[子类](https://zh.wikipedia.org/wiki/子类)引出子类型：如果 *A* 是 *B* 的子类，则类 *A* 的实例可以用在期望类 *B* 的实例的任何上下文中；所以我们称 *A* 是 *B* 的子类型。一个结论就是声明有类型 *B* 的任何变量或形式参数在运行时间可以持有类 *A* 的一个值；在这种情况下很多面向对象编程者会声称 *B* 是这个变量的“静态类型”而 *A* 是它的“动态类型”。

也就是说我们在定义了类型为父类B之后，可以使用子类A的事例去执行。那么就可以称A为B的子类型。

回过头来再看逆变协变的定义：

> 对于函数类型T1 **→** T2，其子类型为S1**→** S2，则T1 <: S1且S2<: T2。S1**→** S2的参数类型为[逆变](https://zh.wikipedia.org/wiki/协变与逆变)，返回类型为[协变](https://zh.wikipedia.org/wiki/协变与逆变)。

对于一个函数接受参数T1，返回T2，另一个函数接受参数S1，返回S2。并且T1是属于S1的子类，而S2是属于T2的子类，那么将第二个函数赋值给第一个函数时，参数类型为逆变，返回类型为协变。

#### 逆变

举个例子：

```javascript
class Animal {
  type() {return 'a'}
}
class Dog extends Animal {
  bark() {return 'b'}
}
class Greyhound extends Dog {
  color() {return 'c'}
}
```

有3个连续继承的class。

```javascript
let animal1 = (a: Animal) => {};
let dog1 = (a: Dog) => {};
let greyhound1 = (a: Greyhound) => {};

dog1 = annimal1;  // ok
dog1 = greyhound1;  // error
```

定义了3个函数，分别接受的参数为3个class，可以看到将类型参数Animal赋值给Dog的时候是可以的，但是将参数类型为Greyhound赋值给Dog时却会eroor，编译器会报类型不兼容。

这是为什么呢？实际上是因为dog1的类型在定义时就确定了，即使你之后赋值了另外一个函数，但是ts的类型推断这边还是会把dog1的参数给推断称Dog。

那么很明了了。我将animal1赋值给dog1，无论我animal1这个函数体里面执行什么操作，他使用的变量都是定义在Animal里面的，而我Dog是继承自Animal，所以这个函数使用的变量我都可以给予定义，那么即使类型安全的。相反Greyhound为Dog的子类，那么如果我在greyhound1里面用到了color这个函数，Dog给不出来定义的，所以就报错了。

因此，可以将父类赋值给子类，这是类型安全的，这成为逆变。

#### 协变

```javascript
let animal2 = () => new Animal();
let dog2 = () => new Dog();
let greyhound2 = () => new Greyhound();

dog1 = annimal1;  // error
dog1 = greyhound1;  // ok
```

反过来，此时我dog1的定义还是返回Dog类型，因此我执行dog1函数去获取对象的时候，我可以使用Dog里面的属性，那么Animal里面没有定义，因此就报错了，而子类Greyhound都定义了，因此赋值成功。这就是返回参数的协变。

#### 双向协变

然而实际上，在ts的类型系统中，参数是属于双向协变的，也就是说如果我的参数赋值是属于逆变或者协变中的一种，那么我就是推断通过的。这实际上是不安全的。但文档中介绍这极少会发生错误，并且能够实现很多JavaScript里的常见模式。如果我们想要禁掉双向协变，可以在ts配置文件中加上strictFunctionTypes，来进行严格的判断。

