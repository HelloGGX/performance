## Browser Parsing Strategies for JavaScript

We know that many web optimization strategies can be selected and implemented based on specific scenarios, but what are the principles behind these strategies? What does the V8 engine do behind the scenes to improve JavaScript performance? And as web developers, how can we leverage this knowledge to our advantage?

The JavaScript engine we refer to here is the V8 engine, primarily used in the Google Chrome browser and Node.js runtime. V8 is a high-performance engine that employs various optimization techniques, such as Just-In-Time (JIT) compilation, hidden classes, and inline caches.

### JavaScript Engine Workflow

When the browser or Node.js environment downloads and loads JavaScript code, the JavaScript engine follows these steps:

1. **Parsing**
   - **Lexical Analysis**: Converts source code into a series of tokens.
   - **Syntax Analysis**: Transforms tokens into an Abstract Syntax Tree (AST).

2. **Compilation**
   - **Bytecode Generation**: The Ignition interpreter converts the AST into bytecode.
   - **Optimized Compilation**: During code execution, the V8 engine monitors the execution and identifies frequently executed code (hot code). This hot code is sent to the optimizing compiler (like Turbofan) for further optimization into efficient machine code.

3. **Execution**
   - **Bytecode Interpretation**: Directly interprets and executes bytecode.
   - **Machine Code Execution**: Executes the compiled machine code.

4. **Memory Management**
   - **Garbage Collection**: Periodically cleans up unused objects to free up memory.

### Pre-parsing

Modern JavaScript engines, such as V8, Chakra, and SpiderMonkey, use a heuristic approach called pre-parsing before fully parsing most functions. The pre-parsing step only checks for syntax errors and avoids the overhead of full parsing.

- **Quick Scan**: The pre-parser quickly scans the code, marking function and variable declarations without deeply parsing function bodies.
- **Skipping Function Bodies**: For function bodies, the pre-parser records their location and size but does not immediately parse their contents.
- **Syntax Check**: The pre-parser performs basic syntax checks but does not inspect the detailed syntax within function bodies.

This approach avoids parsing unused functions during initial loading, saving resources and improving performance. Pre-parsing is applicable to functions, loops, conditionals, objects, and other code blocks.

Example:

```js
// This function will be lazily parsed
function calculateLargeData() {
  let data = [];
  for (let i = 0; i < 1000000; i++) {
    data.push(i * i);
  }
  return data;
}
// Top-level code call
console.log(calculateLargeData()); // This line triggers lazy parsing of calculateLargeData
```

### Full Parsing

Full parsing occurs after pre-parsing, typically when the code is about to execute or a function is called. The main steps include:

- **Detailed Parsing**: The full parser deeply parses all code, including function bodies and nested code blocks.
- **AST Generation**: The full parser generates a detailed AST for subsequent compilation and optimization.
- **Syntax and Semantic Checks**: The V8 engine performs detailed syntax and semantic checks during full parsing to ensure code correctness.

Forcing V8 to use full parsing can be done with an Immediately Invoked Function Expression (IIFE):

```js
(function () {
  // This function body will be immediately parsed and executed
  console.log("This is immediately invoked and thus fully parsed");
})();
```

### Optimizing Parsing Time

Both pre-parsing and full parsing detection mechanisms are based on a greedy algorithm, which only checks if there is a ‘(’ symbol immediately to the left of the function name. In the absence of the ‘(’ symbol, the browser performs pre-parsing and full parsing sequentially, leading to performance overhead. For instance:

```js
!function () {
  // Code
}();
```

Despite the intention to invoke the function immediately, the engine does not detect the left ‘(’, resulting in double parsing. To address this issue, the open-source library optimize-js was developed. It leverages the following approach:

1. **Parse Syntax Tree**: First, it parses the code into a syntax tree.
2. **Check Functions**:
   - **Immediately Invoked Functions**: Checks all immediately invoked functions.

```js
!function () {}();
true && function () {}();
```

- **Functions Passed as Arguments**: Checks all functions directly passed as arguments to another function.

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

3. **Transform**: optimize-js inserts the necessary parentheses for detected immediately invoked functions:

```js
// Input
!function (){}()
function runIt(fun){ fun() }
runIt(function (){})

// Output
!(function (){})()
function runIt(fun){ fun() }
runIt((function (){}))
```

These optimizations effectively prevent double parsing of some immediately invoked functions, improving JavaScript execution speed.

### Performance Comparison

Let's compare the execution time before and after optimization using Create React App and Three.js:

- **Create React App**
  - Before Optimization: 13.300000000745058ms
  - After Optimization: 12.200000000186265ms

- **Three.js**
  - Before Optimization: 12.299999999813735ms
  - After Optimization: 10.5ms

## You Might Not Need optimize-js Anymore

Since V8 v5.7/Chrome 57, two patterns (known as PIFEs) are recognized:

1. Pattern 1:
    ```js
    (function(){
      console.log("This is a PIFE");
    })();
    ```

2. Pattern 2, generated by UglifyJS:
    ```js
    !function(){
      console.log("This is another PIFE");
    }();

    (function(){
      console.log("Another PIFE example");
    }(), function(){
      console.log("And yet another one");
    }());
    ```

V8 eagerly parses and compiles these function expressions, speeding up cold and warm startup times (first and second page loads). Despite significant parser improvements in V8 v7.5, using PIFEs can still enhance startup performance by identifying necessary functions early and compiling them in the background.

However, overusing PIFEs can lead to excessive eager compilation, reducing performance and increasing memory usage. The default configuration in v7.5 is already faster than the optimized version in v6.1. Therefore, unless critical for startup, it’s generally unnecessary to rely heavily on PIFEs for performance optimization.

### Summary:

JavaScript engines follow core steps like parsing, compiling, executing, and memory management. During the parsing stage, functions wrapped in parentheses are eagerly parsed by V8. This behavior, leveraged by libraries like optimize-js, can improve execution speed by avoiding repeated parsing of immediately-invoked function expressions (IIFEs). However, with the optimizations in V8 v7.5, the benefits of optimize-js have diminished, making its extensive use less critical.