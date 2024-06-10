# react-performance-optimization

## 第一部分 V8 性能优化原理

### 第一章 引言

- [1.1 V8 引擎的发展历史](#11-V8引擎的发展历史)：V8 引擎的发展历程是怎样的？
- [1.2 V8 引擎在现代浏览器中的地位](#12-V8引擎在现代浏览器中的地位)：为什么 V8 引擎在现代浏览器中如此重要？
- [1.3 V8 引擎的核心目标与设计原则](#13-V8引擎的核心目标与设计原则)：V8 引擎的设计原则和核心目标是什么？

### 第二章 V8 架构概述

- [2.1 整体架构](#21-整体架构)：V8 引擎的整体架构是怎样的？
- [2.2 V8 的核心组件](#22-V8的核心组件)
  - [2.2.1 解释器（Ignition）](#221-解释器-Ignition)：Ignition 解释器的主要功能是什么？
  - [2.2.2 编译器（TurboFan）](#222-编译器-TurboFan)：TurboFan 编译器的主要功能是什么？
  - [2.2.3 垃圾回收器](#223-垃圾回收器)：V8 引擎的垃圾回收器如何工作？
  - [2.2.4 运行时系统](#224-运行时系统)：V8 引擎的运行时系统包括哪些组件？

### 第三章 即时编译 (JIT)

- [3.1 JIT 编译的基础](#31-JIT编译的基础)：JIT 编译如何动态优化代码执行？
- [3.2 Ignition 解释器](#32-Ignition解释器)：为什么 V8 选择先使用解释器而不是直接编译？
- [3.3 TurboFan 编译器](#33-TurboFan编译器)：TurboFan 如何在运行时进行高级优化？
- [3.4 Baseline 编译器](#34-Baseline编译器)：Baseline 编译器如何平衡编译速度和优化程度？

### 第四章 内联缓存 (Inline Caching)

- [4.1 内联缓存的工作原理](#41-内联缓存的工作原理)：内联缓存如何减少属性查找的时间？
- [4.2 多态内联缓存](#42-多态内联缓存)：如何处理多种对象类型的内联缓存？

### 第五章 垃圾回收机制

- [5.1 垃圾回收的基础](#51-垃圾回收的基础)：垃圾回收如何管理内存？
- [5.2 分代垃圾回收](#52-分代垃圾回收)：垃圾回收的分代机制如何提高效率？
  - [5.2.1 Scavenger](#521-Scavenger)：新生代回收器如何高效回收短命对象？
  - [5.2.2 标记-清除-压缩](#522-标记-清除-压缩)：老生代回收器如何管理长命对象？

### 第六章 内存优化

- [6.1 内存管理策略](#61-内存管理策略)：不同内存管理策略的优缺点是什么？
- [6.2 对象池化](#62-对象池化)：对象池化如何减少垃圾回收频率？
- [6.3 紧凑对象表示](#63-紧凑对象表示)：紧凑对象表示如何节省内存空间？

### 第七章 隐式类 (Hidden Classes)

- [7.1 隐式类的创建与演化](#71-隐式类的创建与演化)：隐式类如何动态创建和优化？
- [7.2 属性访问优化](#72-属性访问优化)：如何利用隐式类优化属性访问？

### 第八章 代码内联 (Code Inlining)

- [8.1 代码内联的基础](#81-代码内联的基础)：代码内联如何减少函数调用开销？
- [8.2 内联优化策略](#82-内联优化策略)：哪些场景下代码内联最有效？

### 第九章 逃逸分析 (Escape Analysis)

- [9.1 逃逸分析的基础](#91-逃逸分析的基础)：逃逸分析如何确定对象的分配位置？
- [9.2 栈分配与堆分配](#92-栈分配与堆分配)：何时选择栈上分配而非堆上分配？

### 第十章 热路径优化 (Hot Path Optimization)

- [10.1 热路径识别](#101-热路径识别)：如何识别代码的热路径？
- [10.2 热路径优化策略](#102-热路径优化策略)：哪些优化策略适用于热路径？

### 第十一章 反优化 (Deoptimization)

- [11.1 反优化的触发条件](#111-反优化的触发条件)：哪些情况下需要反优化？
- [11.2 动态执行调整](#112-动态执行调整)：反优化如何动态调整执行模式？

### 第十二章 v8 性能调试技巧

- [12.1 使用 `--trace-opt` 和 `--trace-deopt` 进行优化跟踪](#211-使用-trace-opt-和-trace-deopt-进行优化跟踪) - 如何利用这些标志进行性能优化分析？
- [12.2 Node.js 性能调试命令](#212-nodejs-性能调试命令) - 列出其他用于查看性能数据的命令及其用途：
  - `--trace-gc` - 跟踪垃圾回收过程。
  - `--trace-ic` - 跟踪内联缓存（IC）的行为。
  - `--trace-turbo` - 跟踪 TurboFan 优化编译器。
  - `--trace-hydrogen` - 跟踪 V8 中的 Hydrogen 中间表示。
  - `--trace-inlining` - 跟踪函数内联过程。
  - `--trace-phases` - 跟踪 V8 的编译阶段。
  - `--trace-elements-transitions` - 跟踪元素过渡。
  - `--trace-maps` - 跟踪地图创建和转换。
  - `--trace-stores` - 跟踪存储操作。
  - `--prof` - 生成 V8 的性能剖析日志。
  - `--prof-process` - 处理由 `--prof` 生成的日志文件。
  - `--inspect` - 启动 Node.js 调试器，并通过 DevTools 调试。
  - `--inspect-brk` - 启动调试器并在第一行代码处暂停。。
- [12.3 实战案例：分析一个示例应用的性能](#214-实战案例-分析一个示例应用的性能) - 通过实际案例理解如何进行性能调试。


## 第二部分 建立结构化性能优化体系

DMAIC是用于结构化优化性能的一种方法论，常用于六西格玛管理中。它包括五个步骤：定义（Define）、测量（Measure）、分析（Analyze）、改进（Improve）和控制（Control）。该方法帮助项目团队识别关键瓶颈及其原因，并将精力集中在高价值领域的性能改进上。

### 第一章 以用户体验为中心的性能指标
这一章我们将回到原点，抛开各种性能优化的实践方法，探寻性能优化是如何从0到1逐步建立的。笔者看到过各种所谓的性能优化书籍和文章，大多千篇一律地直接进入性能优化的实践。即便是好一些的文章，也只会简单讲述一些方法论。手握性能优化的锤子，看哪里都是钉子，最终导致为了优化而优化的KPI式指标。

性能优化并不是一味地追求速度和效率，而是要在性能、稳定性、可维护性和开发成本之间找到一个平衡点。通过深入了解系统的运行机制、瓶颈所在以及优化的潜在收益，我们才能真正做到有的放矢，避免陷入盲目优化的误区。

对于读者而言，每个人所处的业务场景和项目要求都是不同的。只有因地制宜的性能优化策略和指导体系，才能为项目带来真正的价值。


- [2.1 定义用户体验](#2.1-定义用户体验):设计用户视角下的度量方案，关注具体用户一次生命周期的完整体验

- [2.2 设计有效的性能指标](#2.2-设计有效的性能指标)

- [2.4 体验数据采集与关联](#2.4-体验数据采集与关联)：主动挖掘数据，分析数据，提出优化建议

- [2.5 如何建立有效的性能评分模型](./packages/建立用户为中心的性能指标/2.3%20如何建立有效的性能评分模型.md):基于Lighthouse的评分模型原理，定制自己的评分模型

- [2.6 全局视角和用户动线](#2.5-全局视角和用户动线)：如何使用统计学方法处理和分析性能数据，以便优化性能指标。

### 第二章 浏览器性能分析与调试

#### 2.2 火焰图的使用

- [2.2.1 什么是火焰图](#221-什么是火焰图) - 火焰图的定义和作用。
- [2.2.2 安装和配置火焰图工具](#222-安装和配置火焰图工具) - 如何安装和设置火焰图工具？
- [2.2.3 生成火焰图的步骤](#223-生成火焰图的步骤) - 创建火焰图的具体操作步骤。
- [2.2.4 解读火焰图](#224-解读火焰图) - 如何分析和理解火焰图？
- [2.2.5 实战案例：火焰图在性能分析中的应用](#225-实战案例-火焰图在性能分析中的应用) - 通过案例了解火焰图的实际应用。

#### 2.3 浏览器性能调试技巧

- [2.3.1 使用浏览器开发者工具进行性能调试](#231-使用浏览器开发者工具进行性能调试) - 浏览器开发者工具的基本使用方法。
- [2.3.2 性能面板概览](#232-性能面板概览) - 浏览器性能面板的功能和特点。
- [2.3.3 时间轴面板的使用](#233-时间轴面板的使用) - 如何利用时间轴面板进行性能分析？
- [2.3.4 网络面板的使用](#234-网络面板的使用) - 网络面板在性能调试中的作用。
- [2.3.5 Lighthouse 性能分析](#235-Lighthouse-性能分析) - 使用 Lighthouse 进行全面的性能评估。
- [2.3.6 实战案例：分析和优化一个网页的性能](#236-实战案例-分析和优化一个网页的性能) - 具体步骤和方法通过实际案例进行网页性能优化。

## 第三部分 搭建性能监控体系

- [3.1 建立响应机制](#3.1建立响应机制)
  - 性能报警：设置性能报警阈值，当指标超出阈值时，及时通知相关人员。
  - 问题排查：建立快速响应和排查机制，确保在问题出现时能够迅速定位并解决。

## 第四部分 沉淀性能优化策略

### 第一章：浏览器渲染优化

#### 1.1 浏览器的渲染原理

- [1.1.1 浏览器的架构](#111-浏览器的架构) - 浏览器的主要组成部分是什么？这些部分如何协同工作？
- [1.1.2 浏览器渲染引擎](#112-浏览器渲染引擎) - 渲染引擎如何将 HTML 和 CSS 转换为可视化的网页？
- [1.1.3 浏览器的事件循环](#113-浏览器的事件循环) - 事件循环的工作原理及其对渲染的影响。
- [1.1.4 实际场景代码作业](#114-实际场景代码作业-1) - 通过具体代码案例加深对浏览器渲染原理的理解。

#### 1.2 合成线程及其工作机制

- [1.2.1 合成线程简介](#121-合成线程简介) - 合成线程的主要职责是什么？
- [1.2.2 图层创建与管理](#122-图层创建与管理) - 浏览器如何将页面分割成多个图层？
- [1.2.3 图层栅格化](#123-图层栅格化) - 栅格化过程是如何将矢量图形转换为位图图像的？
- [1.2.4 图层合成与绘制](#124-图层合成与绘制) - 合成线程如何确定图层的合成顺序？
- [1.2.5 实际场景代码作业](#125-实际场景代码作业-2) - 实践代码，学习合成线程的应用与优化。

#### 1.3 渲染优化策略

- [1.3.1 减少回流与重绘](#131-减少回流与重绘) - 如何减少不必要的回流和重绘？
- [1.3.2 使用 GPU 加速](#132-使用gpu加速) - GPU 加速如何提高渲染性能？
- [1.3.3 异步合成](#133-异步合成) - 什么是异步合成？它如何工作？
- [1.3.4 优化动画性能](#134-优化动画性能) - 哪些技术可以用来优化动画性能？
- [1.3.5 实际场景代码作业](#135-实际场景代码作业-3) - 针对渲染优化策略的实战案例。

### 第二章：代码分割与优化

#### 2.1 代码分割技术

- [2.1.1 dynamic-import](#211-dynamic-import) - 动态引入模块，提高应用的加载性能。
- [2.1.2 lazy-loading](#212-lazy-loading) - 懒加载技术，按需加载组件或模块，减少初始加载时间。
- [2.1.3 route-based-splitting](#213-route-based-splitting) - 基于路由的代码分割，根据路由按需加载对应的代码。
- [2.1.4 splitting-large-package](#214-splitting-large-package) - 分割大型包，避免一次性加载过多代码。
- [2.1.5 实际场景代码作业](#215-实际场景代码作业-4) - 实战代码，学习代码分割的实际应用。

#### 2.2 渲染优化技术

- [2.2.1 avoid-re-renders](#221-avoid-re-renders) - 避免不必要的重新渲染，提高渲染性能。
- [2.2.2 use-memoization](#222-use-memoization) - 使用记忆化技术优化性能，通过记忆化值来避免不必要的计算。
- [2.2.3 use-debouncing](#223-use-debouncing) - 使用防抖技术优化频繁触发的事件处理。
- [2.2.4 use-throttling](#224-use-throttling) - 使用节流技术控制事件触发的频率。
- [2.2.5 list-virtualization](#225-list-virtualization) - 列表虚拟化，提升长列表渲染性能。
- [2.2.6 实际场景代码作业](#226-实际场景代码作业-5) - 针对渲染优化技术的实战案例。

### 第三章：网络优化

#### 3.1 数据获取优化

- [3.1.1 data-fetching](#311-data-fetching) - 数据获取优化，提高数据加载效率。
- [3.1.2 caching](#312-caching) - 缓存优化，减少网络请求，提高加载速度。
- [3.1.3 cdn-usage](#313-cdn-usage) - 使用 CDN 提供资源，提高资源加载速度。
- [3.1.4 http2](#314-http2) - 使用 HTTP/2 协议，提高网络传输效率。
- [3.1.5 实际场景代码作业](#315-实际场景代码作业-6) - 网络优化的实战代码案例。

### 第四章：图片优化

#### 4.1 图片加载与压缩

- [4.1.1 lazy-load](#411-lazy-load) - 图片懒加载，提高页面初始加载速度。
- [4.1.2 responsive-images](#412-responsive-images) - 响应式图片，根据设备和屏幕大小加载不同尺寸的图片。
- [4.1.3 modern-formats](#413-modern-formats) - 使用现代图片格式（如 WebP）提高图片加载和渲染速度。
- [4.1.4 image-compression](#414-image-compression) - 图片压缩，减少图片文件大小，提高加载速度。
- [4.1.5 实际场景代码作业](#415-实际场景代码作业-7) - 图片优化的实战代码案例。

### 第五章：依赖包优化

#### 5.1 依赖包优化技术

- [5.1.1 bundle-analyzer](#511-bundle-analyzer) - 使用包分析工具分析和优化打包大小。
- [5.1.2 tree-shaking](#512-tree-shaking) - 使用 Tree Shaking 移除未使用的代码，减少打包大小。
- [5.1.3 import-optimization](#513-import-optimization) - 优化模块引入，减少打包大小和加载时间。
- [5.1.4 实际场景代码作业](#514-实际场景代码作业-8) - 依赖包优化的实战代码案例。

### 第六章：服务器端渲染

#### 6.1 服务器端渲染技术

- [6.1.1 nextjs](#611-nextjs) - 使用 Next.js 进行服务器端渲染，提高应用性能。
- [6.1.2 custom-ssr](#612-custom-ssr) - 自定义服务器端渲染，提升性能和 SEO。
- [6.1.3 ssr-caching](#613-ssr-caching) - 服务器端渲染缓存，提高渲染速度和性能。
- [6.1.4 实际场景代码作业](#614-实际场景代码作业-9) - 服务器端渲染的实战代码案例。

### 第七章：其他优化

#### 7.1 其他优化技术

- [7.1.1 preloading-prefetching](#711-preloading-prefetching) - 预加载和预取资源，提升页面加载速度。
- [7.1.2 web-workers](#712-web-workers) - 使用 Web Workers 在后台执行任务，提高应用响应速度。
- [7.1.3 code-minification](#713-code-minification) - 代码压缩，减少文件大小，提高加载速度。
- [7.1.4 accessibility-optimization](#714-accessibility-optimization) - 优化可访问性，提高用户体验。
- [7.1.5 实际场景代码作业](#715-实际场景代码作业-10) - 综合优化的实战代码案例。
