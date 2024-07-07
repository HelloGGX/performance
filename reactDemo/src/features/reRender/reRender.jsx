import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addTodo } from './oldTodoSlice.js';
import TodoItem from './TodoListItem.jsx';

export default function Todo() {
  const todos = useSelector((state) => state.todos.todos);

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
