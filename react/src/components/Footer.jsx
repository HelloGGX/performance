import React from "react"
import { chunk } from 'lodash-es'

function Footer() {
  // TODO: 实际实现一个导航栏
  const chunkRes = chunk(['a', 'b', 'c', 'd'], 2);
  console.log(chunkRes)
  return <div>底部</div>;
}

export default Footer;
