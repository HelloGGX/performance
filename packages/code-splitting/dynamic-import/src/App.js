import { Suspense, useState } from "react";

const Navbar = React.lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("../components/Navbar")), 2000)
    )
);

const Footer = React.lazy(() => import("../components/Footer"));

export default function App() {
  const [count, setCount] = useState("0");

  async function handleClick() {
    setCount((prev) => ++prev);
  }

  return (
    <div>
      <main>
        <Suspense fallback={<div>loading</div>}>
          <Navbar />
        </Suspense>
        <button onClick={() => handleClick()}>点击增加</button>
        <div>{count}</div>
        <Suspense fallback={<div>loading</div>}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
