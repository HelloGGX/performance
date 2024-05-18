# 浏览器对 javascript 的解析策略

我们知道很多针对 web 优化的方案，只需要根据情况选择合适的方案实施即可，但方案背后的原理是什么？浏览器 V8 引擎在背后为提高 javascript 的速度做了哪些工作？以及作为 Web 开发人员如何将这些知识转化为收益？

下面我们说的 javascript 引擎都指 V8 引擎，主要用于 Google Chrome 浏览器和 Node.js 运行时。V8 是一个高性能的引擎，采用了多种优化技术，例如即时编译（JIT）、隐藏类和内联缓存（Inline Caches）等。

## JavaScript 引擎的工作流程

当浏览器或 Node.js 环境下载并加载 JavaScript 代码后，JavaScript 引擎会开始以下步骤：

1. **解析（Parsing）**

   - 词法分析（Lexical Analysis）：将源代码转换成一系列的标记（Tokens）。
   - 语法分析（Syntax Analysis）：将标记转换成抽象语法树（AST）。

2. **编译（Compilation）**

   - 字节码生成（Bytecode Generation）：Ignition 解释器将 AST 转换成字节码。
   - 优化编译（Optimized Compilation）：在代码执行过程中，根据代码的运行情况，V8 引擎会监视代码的执行情况，并识别出哪些代码片段被频繁执行。这些热点代码（hot code）会被送到优化编译器（如 Turbofan）进行进一步优化。进一步将热代码（Hot Code）优化为高效的机器代码。

3. **执行（Execution）**

   - 字节码解释（Bytecode Interpretation）：直接解释执行字节码。
   - 机器代码执行（Machine Code Execution）：执行编译后的机器代码。

4. **内存管理（Memory Management）**
   - 垃圾回收（Garbage Collection）：定期清理不再使用的对象，释放内存。

而在上面的解析阶段，更进一步地说，是在语法分析阶段，现代 JavaScript 引擎（如 V8、Chakra 和 SpiderMonkey）具有一种启发式方法，即：在进行全面解析之前对大多数函数进行预解析。预解析步骤只是检查语法错误，同时避免了全面解析的代价。

### 预解析（pre-parsing）

在代码初次加载时，V8 引擎会先进行一种轻量级的预解析，只检查基本的语法结构是否正确，但不会生成完整的 AST。这种方式主要是为了快速通过初步的语法检查，减少初始加载时间

- 快速扫描：预解析器快速扫描代码，以标记函数和变量声明，但不会深入解析函数体。
- 跳过函数体：对于函数体，预解析器会记录它们的位置和大小，但不会立即解析它们的内容。
- 语法检查：预解析器会进行基本的语法检查，但不会检查函数体内部的详细语法。

预解析的策略是，解析器在遇到函数声明时，不立即解析整个函数的内容，而是先标记一下有这个函数。当这个函数真的被调用时，再去解析它的具体内容。这样做可以避免在程序执行过程中解析未被调用的函数，从而节省资源，提高性能。预解析不仅适用于函数，还适用于循环、条件判断、对象等。基本上，所有需要解析的代码块都可以使用这种方法。

例子：

```js
// 这个函数会被标记为 lazy parsing
function calculateLargeData() {
  let data = [];
  for (let i = 0; i < 1000000; i++) {
    data.push(i * i);
  }
  return data;
}
// 顶级代码调用
console.log(calculateLargeData()); // 这行代码会触发 lazy parsing 对 calculateLargeData 的解析
```

### 完整解析 (full-Parsing)

完整解析是在预解析之后进行的，通常在代码即将执行或函数被调用时进行。完整解析的主要特点和步骤如下：

- 详细解析：完整解析器（Full Parser）会深入解析所有代码，包括函数体和嵌套的代码块。
- 生成 AST：完整解析器会生成详细的抽象语法树（AST），用于后续的编译和优化。
- 语法和语义检查：在完整解析过程中，V8 进行详细的语法和语义检查，确保代码的正确性。

完整解析处于**预解析之后，字节码生成之前**

假如我们需要指定 v8 引擎采用完整解析，那么写一个立即执行函数（IIFE）强制 V8 立即执行并解析函数体。这是因为自调用函数需要立即执行，因此引擎会对其进行完整解析。

```js
(function () {
  // 这个函数体会被立即解析和执行
  console.log("This is immediately invoked and thus fully parsed");
})();
```

## 优化解析时间

以上两种检测机制都是基于贪心算法，只检查紧邻函数左侧是否有一个‘(’符号，例如 (function(){…})，在没有‘(’符号的情况下，浏览器会按照预解析、完整解析的顺序解析两次，带来一定的性能开销。比如下面的代码：

```js
!function () {
  // 代码
}();
```

虽然作者的用意是立即调用该函数，但引擎没有检测到左边的‘(’，依然会先进行两次解析。为了解决以上问题，出现了一个开源库：optimize-js，它充分利用了这一点：

1. 解析语法树：首先，它将代码解析成语法树（syntax tree）
2. 检查函数：
   - 立即调用的函数：检查所有立即调用的函数。

```js
!function () {}();
true && function () { }();
```

- 作为参数传递的函数：检查所有直接作为参数传递给另一个函数的函数。
```js
function logResult(result) {
  console.log("The result is: " + result);
}

logResult(
  function () {
    var a = 5;
    var b = 3;
    return a + b;
  }()
);
```
3. 转换: optimize-js会将识别到的立即执行函数插入必要的括号：
```js
// 输入
!function (){}()
function runIt(fun){ fun() }
runIt(function (){})

//输出
!(function (){})()
function runIt(fun){ fun() }
runIt((function (){}))
```
以上优化手段，有效避免了浏览器对部分立即执行函数的重复解析，提高了js的执行速度。

我们来对比一下Create React App优化前后的执行时间：

- 优化前：13.300000000745058ms
- 优化后：12.200000000186265ms

Three.js 
- 优化前：12.299999999813735ms
- 优化后：10.5ms


## 你可能并不需要optimize-js

从V8的v5.7/Chrome 57版起，就已经可以识别两种模式（统称为: PIFEs）

1. 模式1
```js
// 示例1
(function(){
  console.log("This is a PIFE");
})();
```

2. 模式2,由UglifyJS生成的模式
```js
// 示例2
!function(){
  console.log("This is another PIFE");
}();

// 示例3
(function(){
  console.log("Another PIFE example");
}(), function(){
  console.log("And yet another one");
}());
```

V8引擎会对可能被调用的函数表达式（PIFEs）进行提前解析和编译，这可以加快冷启动和热启动的速度，即第一次和第二次页面加载时的总时间。虽然在V8 v7.5版本中解析器已有显著改进，但使用PIFEs仍然有助于启动性能，因为V8能够提前知道哪些函数会被使用，避免预解析并在后台线程上进行编译。

然而，应避免不必要地用括号包装函数来触发这种启发式，因为这会导致更多代码被急切编译，从而降低启动性能并增加内存使用量。

事实上，v7.5的默认配置已经比v6.1的优化版本更快。因此，除非是启动时需要的关键代码，否则不建议广泛使用PIFEs来优化性能。

## 总结：

我们知道了JavaScript引擎在加载和执行代码时，一般遵循解析、编译、执行、内存管理等四个核心步骤。在解析阶段的语法分析阶段，又分为两个阶段：预解析阶段和全面解析阶段，而解析采用贪心算法，匹配紧邻函数名左边的‘(’,作为立即执行函数的标识，而立即执行函数（IIFE）会强制V8立即解析函数体，利用这一特性，我们可以将立即执行函数用括号包裹，有效避免浏览器对部分立即执行函数的重复解析，提高 JavaScript 的执行速度，利用该特性的开源库有：optimize-js和optimize-js-plugin。而V8 v7.5已经对此进行了优化，因此optimize-js带来的性能提升已经大大减少，因此，除非是启动时需要的关键代码，否则不建议广泛使用PIFEs来优化性能。


