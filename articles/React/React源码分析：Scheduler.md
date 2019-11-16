base: react-16.10.2

首先查看 README 文件，官方介绍 Scheduler 是在浏览器环境中对任务进行协作调度的一个库。因此实际上，这个库跟 react 并没有关联，它只是实现了对一连串的任务进行排序，然后在适当的时间去执行任务的这样一个功能。

# 1. 任务优先级

在 SchedulerPriorities 文件中，定义了任务的优先级。

```js
export const NoPriority = 0; // 没有优先级，一些任务初始化的时候可能会用到
export const ImmediatePriority = 1; //最高优先级
export const UserBlockingPriority = 2; //用户阻塞型优先级
export const NormalPriority = 3; //普通优先级
export const LowPriority = 4; // 低优先级
export const IdlePriority = 5; // 空闲优先级
```

这 5 种优先级都有自己的 timeout。

```js
// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var maxSigned31BitInt = 1073741823;

// Times out immediately
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
var USER_BLOCKING_PRIORITY = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
var IDLE_PRIORITY = maxSigned31BitInt;
```

timeout 的意思就是说，在安排任务顺序的时候，我们是通过获取当前的页面时间加上这个 timeout，计算出这个任务的过期时间。如果页面时间超过了这个任务的过期时间，则表明这个任务需要立即执行。

因此上述优先级中，ImmediatePriority 的过期时间小于当前页面时间，会立即执行，而 USER_BLOCKING_PRIORITY 的过期时间则是在当前页面时间的 250ms 之后。

# 2. 任务排序

通过 unstable_scheduleCallback 方法来进行任务的排序。

```js
function unstable_scheduleCallback(priorityLevel, callback, options) {
  var currentTime = getCurrentTime(); // 获取当前页面时间

  var startTime; // 就是currentTime，如果options里面有delay则加上delay
  var timeout; // 任务优先级里所对应的timeout，如果options里面有timeout则就是该timeout
  if (typeof options === 'object' && options !== null) {
    var delay = options.delay;
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay;
    } else {
      startTime = currentTime;
    }
    timeout =
      typeof options.timeout === 'number'
        ? options.timeout
        : timeoutForPriorityLevel(priorityLevel);
  } else {
    timeout = timeoutForPriorityLevel(priorityLevel);
    startTime = currentTime;
  }

  var expirationTime = startTime + timeout;

  var newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
  };
  //....todo
}
```

可以看到该函数接受 3 个参数，任务的优先级，任务的回调，以及一些 options(delay, timeout)。

上部分的代码的话，就是计算出这个任务的 startTime 与 expirationTime。然后生成一个 task，保存了各种信息。

接下来就是对该任务进行排序了。

```js
// Tasks are stored on a min heap
var taskQueue = [];
var timerQueue = [];

function unstable_scheduleCallback(priorityLevel, callback, options) {
  // ...省略
  if (startTime > currentTime) {
    // This is a delayed task.
    newTask.sortIndex = startTime;
    push(timerQueue, newTask);
    // ...省略
  } else {
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);
    // ...省略
  }

  return newTask;
}
```

可以看到代码对任务的开始时间进行了判断，如果大于现在的页面时间，也就是说这个任务现在还不能执行的，会放到 timerQueue 队列里面，否则放入到 taskQueue 里面去。

这两个队列的通过[Min Heap](https://medium.com/@randerson112358/lets-build-a-min-heap-4d863cac6521)来存储任务。也就是说队列的第一个任务，就是我们最先需要执行的任务。排序的依据的话在 timerQueue 里面是 startTime， 在 taskQueue 里面是 expirationTime。

每次在执行任务的时候，都会先去判断 timerQueue 里面的任务是否已经到了需要执行的时间了，如果到了则会取出来放入 taskQueue 里面，进行排序，最后取出 taskQueue 的任务依次去执行。

# 3. 任务调度

安排好任务之后，会调用 requestHostCallback(flushWork)来注册 flushWork 回调，并在适当的时间进行调用。

```js
const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = performWorkUntilDeadline;

requestHostCallback = function(callback) {
  scheduledHostCallback = callback;
  // enableMessageLoopImplementation 为 true
  if (enableMessageLoopImplementation) {
    if (!isMessageLoopRunning) {
      isMessageLoopRunning = true;
      port.postMessage(null);
    }
  } else {
    if (!isRAFLoopRunning) {
      // Start a rAF loop.
      isRAFLoopRunning = true;
      requestAnimationFrame(rAFTime => {
        onAnimationFrame(rAFTime);
      });
    }
  }
};
```

这里的 enableMessageLoopImplementation 写死为 true，也就是说目前的调度器的更新策略并不是使用 requestAnimationFrame，并在 frame 里面通过 postMessage 来进行的了。而是直接通过一开始就调用 postMessage 来直接调度。

port1 接受到 message 之后，进入 performWorkUntilDeadline 来执行任务。

```js
const performWorkUntilDeadline = () => {
  if (enableMessageLoopImplementation) {
    // 有任务需要执行
    if (scheduledHostCallback !== null) {
      const currentTime = getCurrentTime();
      // 计算出本次更新的结束时间
      frameDeadline = currentTime + frameLength;
      const hasTimeRemaining = true;
      try {
        // 开始进行任务的执行
        const hasMoreWork = scheduledHostCallback(
          hasTimeRemaining,
          currentTime,
        );
        // 调度结束，如果还有任务需要执行，则postMessage等待进行下一次的调度，否则进行收尾工作
        if (!hasMoreWork) {
          isMessageLoopRunning = false;
          scheduledHostCallback = null;
        } else {
          port.postMessage(null);
        }
      } catch (error) {
        port.postMessage(null);
        throw error;
      }
    } else {
      isMessageLoopRunning = false;
    }
    // Yielding to the browser will give it a chance to paint, so we can
    // reset this.
    needsPaint = false;
  } else {
    // ...省略
  }
};
```

代码中用到了 frameLength，也就是说每一次更新持续的时间，目前使用的是 5ms。也就是说是应用可以保持在一个大于 120 帧超高的频率上更新。

scheduledHostCallback 保存的就是之前传进来的 flushWork 这个函数。这个函数会调用 workLoop 来执行任务。

```js
// hasTimeRemaining为true，initialTime为currentTime
// 传hasTimeRemaining为false，为只运行过期任务
function workLoop(hasTimeRemaining, initialTime) {
  let currentTime = initialTime;
  advanceTimers(currentTime); // 之前讲过的提取timerQueue的任务到taskQueue里面去
  currentTask = peek(taskQueue); // 获取第一个任务
  while (currentTask !== null) {
    // 这个做的判断是说当前任务的过期时间还是大于现在的时间，并且没有多于的时间了或者shouldYieldToHost返回为true的时候，则暂停执行。
    if (
      currentTask.expirationTime > currentTime &&
      (!hasTimeRemaining || shouldYieldToHost())
    ) {
      // This currentTask hasn't expired, and we've reached the deadline.
      break;
    }
    const callback = currentTask.callback;
    if (callback !== null) {
      currentTask.callback = null;
      currentPriorityLevel = currentTask.priorityLevel;
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      // 执行任务
      const continuationCallback = callback(didUserCallbackTimeout);
      currentTime = getCurrentTime();
      // 如果任务返回的是一个function，则替换任务的回调函数，否则删除该任务
      if (typeof continuationCallback === 'function') {
        currentTask.callback = continuationCallback;
      } else {
        if (currentTask === peek(taskQueue)) {
          pop(taskQueue);
        }
      }
      advanceTimers(currentTime);
    } else {
      pop(taskQueue);
    }
    currentTask = peek(taskQueue);
  }
  // ...省略
}
```

上面的代码有调用到 shouldYieldToHost 来判断这次任务的调度是否需要停止。

```js
let maxFrameLength = 300;

shouldYieldToHost = function() {
  const currentTime = getCurrentTime();
  // frameDeadline为上面计算出来的这一次更新需要停止的时间
  if (currentTime >= frameDeadline) {
    // There's no time left in the frame. We may want to yield control of
    // the main thread, so the browser can perform high priority tasks. The
    // main ones are painting and user input. If there's a pending paint or
    // a pending input, then we should yield. But if there's neither, then
    // we can yield less often while remaining responsive. We'll eventually
    // yield regardless, since there could be a pending paint that wasn't
    // accompanied by a call to `requestPaint`, or other main thread tasks
    // like network events.
    // 如果现在浏览器需要重绘或者浏览器有需要处理的输入事件时，返回true，表示这次更新需要停止了
    if (needsPaint || scheduling.isInputPending()) {
      // There is either a pending paint or a pending input.
      return true;
    }
    // There's no pending input. Only yield if we've reached the max
    // frame length.
    return currentTime >= frameDeadline + maxFrameLength;
  } else {
    // There's still time left in the frame.
    return false;
  }
};
```

# 4. 总结

- 根据任务优先级来计算出任务的过期时间
- 根据任务的过期时间，开始时间来加入 timerQueue 或者 taskQueue 队列
- 创建任务调度机制，通过 postMessage 来在下一事件循环中执行任务
- 计算出该一次执行任务的持续时间，执行 taskQueue 里面的任务
- 执行结束，如果还有任务需要执行，则继续通过 postMessage 来安排下一次任务调度
