import { useState } from 'react';

function ReRenderUI() {
  const [value, setValue] = useState('');

  const onChangeText = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input placeholder="请输入" onChange={onChangeText} value={value} />
      <p>
        {value
          .split('')
          .map((word) => word && '🍕')
          .join(' ')}
      </p>
    </>
  );
}

export default ReRenderUI;
