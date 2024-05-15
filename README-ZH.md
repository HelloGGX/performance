# react-performance-optimization

## 项目概览和使用说明
- **README.md**：项目介绍和使用说明。

## 代码分割
- **dynamic-import**：动态引入模块，提高应用的加载性能。
- **lazy-loading**：懒加载技术，按需加载组件或模块，减少初始加载时间。
- **route-based-splitting**：基于路由的代码分割，根据路由按需加载对应的代码。
    - react-router：使用最新的数据路由带来的lazy
- **splitting-large-package**：分割大型包，避免一次性加载过多代码。

## 渲染优化
- **avoid-re-renders**：避免不必要的重新渲染，提高渲染性能。
- **use-memo**：使用 `useMemo` 优化性能，通过记忆化值来避免不必要的计算。
- **use-callback**：使用 `useCallback` 优化性能，通过记忆化函数来避免不必要的函数创建。
- **use-transition**：使用 `useTransition` 实现并发模式，提高用户界面的响应速度。
- **list-virtualization**：列表虚拟化，提升长列表渲染性能。
  - **react-virtualized**：使用 `react-virtualized` 进行列表虚拟化。
  - **vue-virtualized**：使用 `vue-virtualized` 进行列表虚拟化。
- **concurrent-mode**：并发模式，提高应用的响应性能。

## 性能监控
- **react-profiler**：使用 React Profiler 进行性能监控和分析。
- **web-vitals**：收集和报告核心 Web Vitals 指标，监控页面性能。
- **lighthouse**：使用 Lighthouse 进行网页性能分析和优化建议。

## 网络优化
- **data-fetching**：数据获取优化，提高数据加载效率。
  - **react-query**：使用 `react-query` 进行数据获取和缓存。
  - **swr**：使用 `swr` 进行数据获取和缓存。
- **caching**：缓存优化，减少网络请求，提高加载速度。
- **cdn-usage**：使用 CDN 提供资源，提高资源加载速度。
- **http2**：使用 HTTP/2 协议，提高网络传输效率。

## 图片优化
- **lazy-load**：图片懒加载，提高页面初始加载速度。
  - **react-lazyload**：使用 `react-lazyload` 实现图片懒加载。
- **responsive-images**：响应式图片，根据设备和屏幕大小加载不同尺寸的图片。
- **modern-formats**：使用现代图片格式（如 WebP）提高图片加载和渲染速度。
- **image-compression**：图片压缩，减少图片文件大小，提高加载速度。

## 依赖包优化
- **bundle-analyzer**：使用包分析工具分析和优化打包大小。
- **tree-shaking**：使用 Tree Shaking 移除未使用的代码，减少打包大小。
- **import-optimization**：优化模块引入，减少打包大小和加载时间。

## 服务器端渲染
- **nextjs**：使用 Next.js 进行服务器端渲染，提高应用性能。
- **custom-ssr**：自定义服务器端渲染，提升性能和 SEO。
- **ssr-caching**：服务器端渲染缓存，提高渲染速度和性能。

## 其他优化
- **preloading-prefetching**：预加载和预取资源，提升页面加载速度。
- **web-workers**：使用 Web Workers 在后台执行任务，提高应用响应速度。
- **code-minification**：代码压缩，减少文件大小，提高加载速度。
- **accessibility-optimization**：优化可访问性，提高用户体验。
