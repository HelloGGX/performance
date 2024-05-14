import { useState } from "react";
const Footer = React.lazy(() => import("./components/Footer.jsx"));
const NavBar = React.lazy(
  () =>
    // 模拟网络延迟，延迟2秒加载组件
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./components/Nav.jsx")), 2000)
    )
);

export default function App() {
  const [count, setCount] = useState("0");

  async function handleClick() {
    setCount((prev) => ++prev);
  }

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <NavBar />
      </React.Suspense>
      <main>
        <button onClick={() => handleClick()}>点击增加</button>
        <div>{count}</div>
      </main>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </React.Suspense>
    </div>
  );
}
