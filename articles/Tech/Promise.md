在知乎上看到一个关于promise的执行顺序的问题，原先信心满满的我看了题目之后备受打击，以为对promise的执行时序理解的非常到位了，没想到还是有遗漏的地方。翻看下面的答案，有个人附上了一个promise的模式实现，看了下代码之后发现非常巧妙。原来一个promise实际上还是隐藏了非常多的黑科技的。

先看下问题：

```js
new Promise((resolve) => {
  let resolvedPromise = Promise.resolve(); // fullfilled
  resolve(resolvedPromise);
}).then(() => {
  console.log("resolvePromise resolved");
});

Promise.resolve()
  .then(() => {
  console.log("promise1");
})

  .then(() => {
  console.log("promise2");
})

  .then(() => {
  console.log("promise3");
});
```

这个问题主要考察的就是在promise resolve一个promise的时候，它的执行时序究竟是怎么样的。

我们知道在Promise 的构造函数里面，它会去执行传递进去的函数。

```typescript
class MPromise implements IMPromise {
  status: "PENDING" | "FULFILLED" | "REJECTED";
  _FulfilledTaskQueue: Array<Function>;
  _RejectedTaskQueue: Array<Function>;
  value: any;
  err: any;

  constructor(executor: promiseExecutor) {
    this._FulfilledTaskQueue = this._RejectedTaskQueue = [];
    this.status = "PENDING";
    this.value = this.err = null;

    const resolve: resolve = (value: any) => {
      // code
    };

    const reject: reject = (err: any) => {
      // code
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      this.err = err;
      reject(err);
    }
  }
}

```

在这个例子里面，resolve的是一个promise，那个resolve这个function会对promise做一个包装：

```typescript
 const resolve: resolve = (value: any) => {
   const _resolveGeneralValue = (value: any) => {
     if (this.status == "PENDING") {
       this.status = "FULFILLED";
       this.value = value;
       this._FulfilledTaskQueue.forEach((thenFunc) => {
         thenFunc(value);
       });
     }
   };

   if (value instanceof MPromise) {
     this.promiseResolveThenableJob(value).then(
       (val) => {
         if (val instanceof MPromise) resolve(val);
         else _resolveGeneralValue(val);
       },
       (err) => reject(err)
     );
   } else {
     _resolveGeneralValue(value);
   }
 };
```

