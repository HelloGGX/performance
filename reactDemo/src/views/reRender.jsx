import { useState } from 'react';

function ReRenderUI() {
  const [value, setValue] = useState('');

  const onChangeText = (e) => {
    setValue(e.target.value);
  };

  return <input onChange={onChangeText} value={value} />;
}

export default ReRenderUI;
