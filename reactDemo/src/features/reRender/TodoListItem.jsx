import { useDispatch } from 'react-redux';
import { toggleTodo } from './todosSlice';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(
      toggleTodo({
        id,
      }),
    );
  };
  return (
    <li
      key={todo.id}
      className="flex items-center justify-between bg-white p-4 rounded shadow mb-2"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggle(todo.id)}
          className="mr-2"
        />
        <span className={todo.completed ? 'line-through text-gray-500' : ''}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => handleToggle(todo.id)}
        className="text-blue-500 hover:text-blue-700"
      >
        {todo.completed ? '完成' : '未完成'}
      </button>
    </li>
  );
}
