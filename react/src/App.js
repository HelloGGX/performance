import React, { useEffect, useState } from "react";
import NavBar from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [count, setCount] = useState("0");


  async function handleClick() {
    const a = await microTask();
    console.log(a);
    setCount((prev) => ++prev);
  }

  async function microTask() {
    await Promise.resolve();
    return "你好";
  }
  return (
    <div>
      <NavBar />
      <main>
        <button onClick={() => handleClick()}>点击增加</button>
        <div>{count}</div>
      </main>
      <Footer />
    </div>
  );
}
