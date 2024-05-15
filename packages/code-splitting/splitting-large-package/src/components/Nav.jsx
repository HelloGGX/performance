import { chunk } from 'lodash-es'

function NavBar() {
  // TODO: 实际实现一个导航栏
  const chunkRes = chunk(['a', 'b', 'c', 'd'], 2);
  return <h1>导航栏</h1>;
}

export default NavBar;
