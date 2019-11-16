### 简介

Grid Layout 是 CSS 的一种新的布局模型，它具有强大的功能来控制框及其内容的大小和位置。与单轴布局的 Flexible Box Layout 不同，Grid Layout 可以在两个轴（列和行）中对齐内容。

### 通过一个示例学习 grid 语法

#### 示例

设计一个如图的模块，划分为 5 个区域：游戏标题，排行榜，分数栏，游戏区域和控制区域。

- 游戏区域的宽度与高度自适应
- 排行榜的高度固定，当该区域有空余的位置时，其置于顶部
- 控制区域在空间多余时置于中间

![](https://i.loli.net/2019/11/16/ghzCa2NnoSuTZj9.png)

这是一个最简单的可以应用 grid 的示例，下面放上代码：

```html
<div id="grid">
  <div id="title">Game Title</div>
  <div id="score">Score</div>
  <div id="stats">Stats</div>
  <div id="board">Board</div>
  <div id="controls">Controls</div>
</div>
```

```css
#grid {
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 30px 1fr 30px;
  grid-template-areas: 'title board' 'stats board' 'score controls';
  width: 300px;
  height: 500px;
}
#title {
  grid-column: 1;
  grid-row: 1;
}
#score {
  grid-area: score;
}
#stats {
  grid-column: 1;
  grid-row: 2;
  align-self: start;
}
#board {
  grid-column: 2;
  grid-row: 1 / span 2;
}
#controls {
  grid-column: 2;
  grid-row: 3;
  justify-self: center;
}
```

应用 grid 来布局我们可以轻松创建一个可以自适应多余空间的布局。这是 grid 的优点之一。

grid 的还有一个特性就是 grid 可以让我们的布局与 html 语义结构解耦出来，不用根据 html 所定义的结构顺序来渲染，试我们可以在不同宽度的屏幕上展示不同的布局。

![](https://i.loli.net/2019/11/16/17wAP9ZnvxQKUaH.png)
接下来一步步分析 grid 的语法：

### 生成 grid 容器

可以通过 display:gird|inline-grid 生成一个 grid contaienr。grid container 建立一个 grid formatting context，特性与 BFC 类似，除了：

1. float 和 clear 属性对 grid tem 不会产生影响
2. grid item 的 margins 不会重叠
3. vertical-align 对 grid-item 无效...等。

这里需要注意的是这些特性只是存在 GFC 这一层，即对 grid item 这个对象有用，如果 grid item 这一层建立的是一个 BFC，则该 grid item 里面的 content 还是遵从 BFC 进行渲染。

### 声明 grid 网格

可以通过 grid-template-rows,grid-template-columns 和 grid-template-areas 三个属性来显示声明 grid 网格。

#### grid-template-\*

grid-template-rows 和 grid-template-columns 是生成网格线，网格线的索引是从显示声明的边缘网格线开始计数，左右两边分别从 1 和-1 开始。当然我们也可以手动命名网格线，例子如下：

```
grid-template-columns: [first nav-start] 150px [main-start] 1fr [last];
grid-template-rows: [first header-start] 50px [main-start] 1fr [footer-start] 50px [last];
```

![grid-named-lines](https://i.loli.net/2019/11/16/atEZfcNP1LOegX6.png)
一条网格线可以有多个名字。  
grid-template-\*的大致的语法如下：**[ < line-names > ? < track-size > ]+ < line-names >?**  
其中 track size 就是两条线之间的空间，我们这里定义具体的长度：可以包括绝对长度单位，百分比长度单位，flexible 长度（在 grid 当中是 fr），max-content，min-content，minmax(min, max)，auto 等，这个在之后会做详细的讨论。  
如果你需要定义的宽度是连续相等重复的，你还可以使用 repeat()：
repeat( [ < positive-integer > | auto-fill | auto-fit ] , < track-list > )

#### grid-template-areas

row 和 column 相连网格线相互交叉组成 grid cell，是放置 grid item 的最小单位。  
grid-template-area 就是给这些 grid cell 进行命名的。如上面的例子，我们给每一个 grid cell 都进行了命名。  
**grid-template-areas 的值是由一系列的 string 组成**，一个 string 代表一行，一行里面的命名通过空格进行区分。需要注意的是所有 string 里面的名字的个数需要相等。并且这些 string 里面所命名的 grid cell 有重复的名字，则需要他们在物理空间上是相连能组成一个更大的 cell 的，否则这个就会报错失效。  
grid-template-areas 会默认为这一个 cell 上面的线生成一个名字，如一个为 foo 的 cell，生成横线名 foo-start，foo-end，竖线名 foo-start，foo-end。

#### grid-auto-\*

当我们使用 grid-template-areas 来命名 cell 的时候，如果我们给的名字多于 grid-template-columns 和 grid-template-rows 组合生成的 cell 时，grid 会自动生成新的网格线来提供 cell。（当 grid item 多于 grid cell 的时候，也同样会自动生成新的网格线）  
而网格线的宽度就是通过 grid-auto-rows/grid-auto-columns 定义的，默认为 auto。我们可以给定一系列的长度单位。grid 会循环使用这些长度单位来生成新的 grid 网格线。

### 声明排序顺序

当我们指定好 grid 的 cell 之后，grid item 会按照顺序放在 cell 之上。我们可以通过 grid-auto-flow 来指定 flow 的方向，默认为 row，即 items 在 grid 的上面默认的 flow 方向是横着的，即一行放不下之后会 flow 到第二行去，而改为 column 之后则会默认竖着 flow。还有一个值为 dense。

### 声明间距

确认好网格线之后，我们还可以声明网格线之间的间距。通过 gap（row-gap 和 column-gap）属性来声明

### 声明布局方式

当我们定义的网格线范围小于 grid 容器的时候，我们可以声明 grid 的布局方式。通过 justify-content 和 align-content 来定义。使用方法与 flexbox 中的类似。 比如值为 end 可以让整个 content 居于 grid container 的尾部。space-between 可以让网格线分离，注意这同时会加大 gap 的距离。

![](https://i.loli.net/2019/11/16/68dYpxtPi1JswLH.png)

### 声明对齐方式

我们可以在 grid container 上声明对齐方式，让 grid item 里面的 content 根据这个规则来对齐。通过 justify-items 和 align-items 来定义。

以上的属性都是在 grid container 这一层的，接下来介绍的是 grid item 这一层了。

### 放置 items

![](https://i.loli.net/2019/11/16/hbydNP4VtvmaGLi.png)
通过这个图片上的属性值我们可以放置我们的 items。比如

```css
grid-row-start: 1;
grid-row-end: 3;
grid-column-start: 2;
grid-column-end: 3;
```

就是说将这个 item 放置到第一行开始第三行结束，第二列开始第三列结束所划分的这一个区域上。可以使用简写写法 grid-row 和 grid-column，通过'/'来区分开始线和结束线。
具体我们可以通过 3 中写法来放置 items：

1. 放置到具名 area 上时我们可以使用 grid-area。
2. 可以通过线的数字索引来放置 items。
3. 可以通过线的名字来放置 items。

如果有许多的线的名字重复的，可以通过数字来指定具体是这些相同名字的线的第几个

```
.six {
  grid-row: text 5 / text 7;
  /* Span between the 5th and 7th lines named "text". */
  grid-row: text 5 / span text 2;
  /* Same as above - start at the 5th line named "text",
     then span across two more "text" lines, to the 7th. */
}
```

这里有一个 span 关键字，默认 item 都是占据一个 cell 的，加上 span 之后，就指明该 item 占据多少 cell。

如果不给 item 指定具体的放置位置，item 则会根据 flow 规则默认占据接下来的一个 cell

### 对齐

可以给特定 item 指定对齐方式。通过 justify-self 和 align-self 来定义。

grid 的大致语法都介绍完了，通过上面的属性我们可以轻松生成一个 grid 容器。接下来我们研究下对于给定的网格线中的长度，grid 容器是如何进行布局的。

## Grid sizing

上面讲到我们通过 grid-template-\*来定义 grid 的网格线，该属性接受一系列的长度单位对 grid 进行切割。

### 绝对长度单位

最常见的比如说 px，这种单位不受屏幕大小或字体的影响。如果 grid-template-\*上使用绝对长度单位，则在构建网格时，使用该绝对长度单位，并且不会进行 flex。即使是有空余的空间或超出 grid 的范围。

```css
display: grid;
grid-template-columns: 30px 30px;
grid-template-rows: 30px 30px 30px;
width: 50px;
height: 500px;
```

### 相对长度单位和百分比

这种单位都是相对于某一个参考值进行缩放，比如说 rem 就是根据根字体进行计算的。这种单位在布局中，在使用之前都是先计算出一个 computed value 的，因此在 grid 的布局中他们的值一开始就定下来了。因此布局规则与绝对单位长度的一样

### min-content

顾名思义，就是说根据该 item 里面的的不可再切割的最小 content 来确定宽度。比如说一个 item 里面的内容是’i am superstar’,则就是根据 superstar 的宽度来进行布局

### max-content

就是根据 item 里面的 content 的宽度就行布局。布局是宽度已经是确定了的，所以规则跟绝对长度单位一样，不会进行 flex。

### fit-content()

fit-content()里面接受一个长度单位，就是说如果 item 里面的 content 宽度没有超过该值的时候通过 max-content 进行布局，超过了话就用该值就行布局

上面介绍的这些都是在布局前就已经确定了一个长度单位了的，不会进行 flex，接下来介绍的这些值是会进行 flex 的。

**_首先需要了解一下 grid 的布局规则，grid 的在布局的时候宽度是从小到大的来进行计算的（这一点与 flexbox 不同）。当我们使用一些 flexible 单位时，计算规则是会去找该 item 的 min-content 的宽度，并将这个宽度作为 flex-basis 来进行 grow_**。

### minmax()

接受两个参数，最小宽度和最大宽度，由于这个函数声明了最小宽度所以 grid 直接使用该值作为 flex-basis，如果 grid 还有剩余空间则会进行 grow，但是 grow 的时候不能超过定义的最大宽度。

### fr

flexible 单位，取 min-content 为最初始宽度，如果有剩余空间则进行 grow。

### Auto

是最后进行 grow 的单位，如果上述都进行 grow 了之后还有空间，则 auto 进行 grow。

### 参考资料

[css-grid-1](https://www.w3.org/TR/css-grid-1)  
[understanding-sizing-css-layout](https://www.smashingmagazine.com/2018/01/understanding-sizing-css-layout/)
