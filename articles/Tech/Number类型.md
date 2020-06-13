[原文: Here is what you need to know about JavaScript’s Number type](https://medium.com/dailyjs/javascripts-number-type-8d59199db1b6)

According to the ECMAScript standard, there is only one type for numbers and it is the ‘double-precision 64-bit binary format IEEE 754 value’. This type is used to store both integers and fractions and is the equivalent of `double` data type in Java and C. 



## Representing numbers in the scientific notation

﻿其中科学计数法的一般表现形式如下：

![image.png](https://i.loli.net/2020/06/13/slkqGCrbdEKe1Py.png)

 

## Understanding how numbers are stored

﻿

![image.png](https://i.loli.net/2020/06/13/4LBjOUFbXJS6Goq.png)

一位为符号，11位为指数exponent，52位为尾数significant

## Examples of how integers are stored

```javascript
// 该代码可以得到数字存储的结果
function to64bitFloat(number) {
    var i, result = "";
    var dv = new DataView(new ArrayBuffer(8));
    dv.setFloat64(0, number, false);
    for (i = 0; i < 8; i++) {
        var bits = dv.getUint8(i).toString(2);
        if (bits.length < 8) {
            bits = new Array(8 - bits.length).fill('0').join("") + bits;
        }
        result += bits;
    }
    return result;
}  
```

如数字1，在我们一般的想法中，1转为二进制科学计数法之后为1*2^0。 表现成64位应该是：

0 00000000000 0000000000000000000000000000000000000000000000000001，

但是运行代码出来的结果却为：

0 01111111111 0000000000000000000000000000000000000000000000000000；

WHY？

1转为科学记数法为 1*2^0；

首先看尾数，我们知道二进制转为科学记数法的时候整数部分都为1，所以就没有必要存储1了，所以尾数部分就全部都是0。

接着是指数部分，先计算基数 [ offset binary](https://blog.angularindepth.com/the-mechanics-behind-exponent-bias-in-floating-point-9b3185083528#.2q5qxmdn3)（指数就是加上基数再转换成二进制）

![image.png](https://i.loli.net/2020/06/13/2lTFwXidWm8stMP.png)

基数代表的是0，所以我们的指数部分就是01111111111；

 

在比如数字3，科学记数法为 1.1*2^1；

尾数部分为1.1，去掉1，然后小数点后面的部分，存储的时候就是直接从左到右存储，所以结果为1000000000...

指数部分

![image.png](https://i.loli.net/2020/06/13/2JoWCIyk7bGvQVN.png)

 

所以结果为0 10000000000 1000000000000000000000000000000000000000000000000000

## Why 0.1+0.2 is not 0.3

﻿0.1转为二进制：

![img](https://i.loli.net/2020/06/13/uVzfg4vkaB6cKws.png)

![image.png](https://i.loli.net/2020/06/13/bHf1a3NXghkvZFt.png)

0.1的存储：

![image.png](https://i.loli.net/2020/06/13/I3NUz9ihaTy5jL6.png)

![image.png](https://i.loli.net/2020/06/13/B7maHU2DTRsLjJp.png)

![image.png](https://i.loli.net/2020/06/13/g1YoIVW5iUw3GRa.png)

![image.png](https://i.loli.net/2020/06/13/r58ekYyAZlLwaMS.png)

0.2转为二进制

![image.png](https://i.loli.net/2020/06/13/sgEx3MlCKkU9Te7.png)

0.1+0.2

![image.png](https://i.loli.net/2020/06/13/cLbOgf51Ay7mzp9.png)

![image.png](https://i.loli.net/2020/06/13/O2J3zxTPIkMCGwA.png)

![image.png](https://i.loli.net/2020/06/13/om9SlXGrdZ8vHMI.png)

![image.png](https://i.loli.net/2020/06/13/evK7S8PGE6Q3JZN.png)

![image.png](https://i.loli.net/2020/06/13/yVYPX8UZebEs6H2.png)

![image.png](https://i.loli.net/2020/06/13/3vcbV7sqUuXYEQG.png)

这跟0.3不相等。

 

## Number.MAX_SAFE_INTEGER

If you type Number.MAX_SAFE_INTEGER into console, it outputs our key number `9007199254740991`. 

`Number.MAX_VALUE` and it’s equal to `1.7976931348623157e+308`.

What may come to you as surprise is that there are some integers that can’t be represented between `MAX_SAFE_INTEGER`and `MAX_VALUE`.

看下MAX_SAFE_INTEGER的存储0 10000110011 1111111111111111111111111111111111111111111111111111；

发现尾数部分全部都是1；所以若我们想要增加数字，只能指数部分增加。

 

MAX_SAFE_INTEGER转为二进制：

![image.png](https://i.loli.net/2020/06/13/dfLtNiRYrc7mIhT.png)

不断加1：

![image.png](https://i.loli.net/2020/06/13/uDXrz69t7fE4aPO.png)

我们发现`9007199254740993`, `9007199254740995不能被展示出来。`

 

### The never ending loop

 这段程序永远都不会结束

```javascript
for (var i=1; 1/i > 0; i++) { 
	console.log("Count is: " + i); 
}  
```

为什么?

因为For the loop to stop, the counter `i` would have to reach `Infinity`, since `1/Infinity > 0` evaluates to `false`. Yet it never happens. In the previous paragraph I explained why some integers can’t be stored and that they are rounded to the nearest even. So in our example JavaScript keeps increasing the counter `i` by `1` until it reaches `9007199254740993`, which is `MAX_SAFE_INTEGER+2`. And this is the first integer that can’t be stored, thus it gets rounded to the nearest even integer `9007199254740992`. So the loop is stuck at this number. The loop won’t be able to get over it and we’ve got an infinite loop here.

 

## A few words about NaN and Infiinity

NaN 被存储为 0 11111111111 1000000000000000000000000000000000000000000000000000

`Infinity` 被存储为 0 11111111111 0000000000000000000000000000000000000000000000000000

有正负之分(sign位可以为1或者0)



NaN和Infinity 的指数部分为1024，而Number.MAX_VALUE的指数部分为1023

Number.MAX_VALUE被存储为 0  11111111110  1111111111111111111111111111111111111111111111111111

 

 