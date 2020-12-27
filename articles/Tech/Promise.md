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

可以看到，当我们的resolve的是一个值的时候，那么就会去执行_FulfilledTaskQueue里面注册的函数。而当value的值还是一个promsie的时候，则会通过promiseResolveThenableJob这个函数对value这个值进行一个包装。

再来看then function

```typescript
  then = (
    onFulfilled: thenFulfillExecutor | any,
    onRejected?: thenRejectExecutor
  ): MPromise =>
    new MPromise((resolve: resolve, reject: reject) => {
      if (!onRejected) {
        onRejected = () => {};
      }
      const registerResolveTask = () => {
        // code
      };

      const registerRejectTask = () => {
        // code
      };

      const _FactExecuteTask = {
        resolveTask: () => queueMicrotask(registerResolveTask),
        rejectTask: () => queueMicrotask(registerRejectTask),
      };

      switch (this.status) {
        case "PENDING":
          this._FulfilledTaskQueue.push(_FactExecuteTask.resolveTask);
          this._RejectedTaskQueue.push(_FactExecuteTask.rejectTask);
          break;
        case "FULFILLED":
          _FactExecuteTask.resolveTask();
          break;
        case "REJECTED":
          _FactExecuteTask.rejectTask();
          break;
      }
    });

```

可以看到将任务放入微任务队列的是在then方法里面。换句话说，只要调用一个then，那么就会触发一个微任务时序。

再来看promiseResolveThenableJob的逻辑：

```typescript
 private promiseResolveThenableJob = (instance) => {
    return new MPromise((r) => {
      instance.then((ret) => r(ret));
    });
  };
```

这个函数同样用一个promise进行了包装。

因此在上一步当我们resolve的是一个promise的时候，一共用了两个then对值进行了包装，因此这个promise会消耗两个微任务时序，即使他是一个 Promise.resolve()。