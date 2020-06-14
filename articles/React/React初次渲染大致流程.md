## React初次渲染大致流程

base: react-16.10.2

事例代码：

```javascript
const container = document.createElement('div');
ReactDOM.render(<div />, container);
```

### 一. createElement

这个部分就是将jsx里面的语法，通过调用createElement，生成ReactElement对象。

```javascript
const element = {
  // This tag allows us to uniquely identify this as a React Element*
	$$typeof: REACT_ELEMENT_TYPE,
	// Built-in properties that belong on the element*
 	type: type,
	key: key,
	ref: ref,
	props: props,
	// Record the component responsible for creating this element.*
	_owner: owner,
};
```

### 二. render

调用的是ReactDOM.render方法。

#### 2.1 生成root

1. 首先new了一个ReactSyncRoot对象。

   这个对象里面的_internalRoot属性上保存了fiberRoot对象。fiberRoot对象上保存了一系列的属性，包括我们传进去的container信息，以及mode。

2. 另外又生成了一个rootFiber，是一个普通的fiber对象。

   fiberRoot与rootFiber相互引用，rootFiber的stateNode为fiberRoot，fiberRoot的current为rootFiber。

#### 2.2 updateContainer

1. 获取当前过期时间 eventTime。

   ```javascript
   // 0 - NoWork
   // 1 - Never
   // 2 - Idle
   // big - low pri things
   // even bigger - hi pri things
   // max 31-bit int - Sync (Math.pow(2, 30) - 1) ---> 1073741823
   
   // Batched = Sync - 1;
   // MAGIC_NUMBER_OFFSET = Batched - 1;
   export function msToExpirationTime(ms: number): ExpirationTime {
   	// Always add an offset so that we don't clash with the magic number for NoWork.
   	return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0);
   }
   ```

2. 计算过期时间 expirationTime。 过期时间越大，优先级也就越大。因为此时我们的mode为legacy mode，因此返回的过期时间为 Sync。

3. 生成了一个update对象， 该对象的payload为{element}，也就是我们传进去的reactElement对象。expirationTime为之前计算出来的expirationTime。

4. enqueueUpdate(current, update)。其中current为rootFiber。rootFiber对象上有一个updateQueue对象。

   ```javascript
   const queue: UpdateQueue<State> = {
     baseState,
     firstUpdate: null,
     lastUpdate: null,
     firstCapturedUpdate: null,
     lastCapturedUpdate: null,
     firstEffect: null,
     lastEffect: null,
     firstCapturedEffect: null,
     lastCapturedEffect: null,
   };
   ```

   updateQueue里买的firstUpdate和lastUpdate都赋值为update对象。

5. scheduleWork 

   1. 给rootFiber的 expirationTime 和 fiberRoot的 firstPendingTime 赋值expirationTime

6. performSyncWorkOnRoot(root)

   1. prepareFreshStack() --> 给全局变量workInProgress赋值当前的rootFiber。并且两个对象通过alternate字段互相循环引用。

7. 进入workLoopSync

   1. while循环判断workInProgress是否为null，如果不为null，则进入performUnitOfWork函数，处理fiber对象。

8. performUnitOfWork

   1. 从workInProgress中的alternate拿出fiber。
   2. 开始beginWork(current, workInProgress, renderExpirationTime)
      1. 判断当前fiber的tag。根据不同的tag执行不同的操作。此时的tag为HostTag。
      2. 执行updateQueue里面的update。
      3. 从update里面拿出element，处理children（此时的children为div标签），给children生成fiber对象。子对象的fiber的return对象为父fiber。然后给该子fiber的effectTag打上Placement的标签
      4. 然后循环执行performUnitOfWork
         1. 判断tag为HostComponent，执行updateHostComponent
         2. 此时children为null，执行mountChildFibers
   3. next为null之后，说明我们fiber都执行完成了。此时进入completeUnitOfWork。
      1. completeUnitOfWork执行的顺序与beginWork的顺序相反。从下到上执行。
      2. 此时为div的fiber，需要创建一个div 标签。
      3. 创建effectList

9. commitRoot

   1. 3次循环effectList
      1. 执行生命周期getSnapshotBeforeUpdate
      2. 执行commit
      3. 执行生命周期componentDidMount

   

   