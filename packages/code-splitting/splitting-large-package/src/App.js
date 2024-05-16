import { useState } from "react";
import add from 'lodash/add';

export default function App() {
  const [count, setCount] = useState("0");

  async function handleClick() {
    setCount((prev) => add(prev, count));
  }

  return (
    <div>
      <main>
        <button onClick={() => handleClick()}>点击增加</button>
        <div>{count}</div>
      </main>
    </div>
  );
}
