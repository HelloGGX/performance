import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addTodo, selectAllTodos, initializeTodos } from './todosSlice.js';
import TodoItem from './TodoListItem.jsx';

let startTime;

export default function Todo() {
  const todos = useSelector(selectAllTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTodos());
  }, [dispatch]);

  useEffect(() => {
    if (startTime) {
      // 在新待办事项添加并渲染完成后记录结束时间
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`New Todo Item Rendered in ${duration.toFixed(3)}ms`);
      startTime = null; // 重置 startTime
    }
  }, [todos]);

  return (
    <>
      <ul className="mt-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <AddTodo />
    </>
  );
}

function AddTodo() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    // 在点击添加按钮时记录开始时间
    startTime = performance.now();
    dispatch(
      addTodo({
        title,
      }),
    );
    setTitle('');
  };

  return (
    <div className="mt-4 flex items-center">
      <div className="fixed bottom-4 right-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="请填写代办事项"
          className="border border-gray-300 rounded p-2 flex-grow mr-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          添加待办事项
        </button>
      </div>
    </div>
  );
}
