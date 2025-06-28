import { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const onTodoInputChange = (e) => {
    setTodo(e.target.value);
  };

  const onAddtodoClick = () => {
    if (!todo.trim()) return;
    setTodoList([...todoList, { id: uuid(), todo: todo, isCompleted: false }]);
    setTodo("");
  };

  const onDeleteClick = (id) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
  };

  const onTodoCheckChange = (id) => {
    const updatedTodoList = todoList.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodoList(updatedTodoList);
  };

  const completedCount = todoList.filter((item) => item.isCompleted).length;
  const progress = todoList.length
    ? Math.round((completedCount / todoList.length) * 100)
    : 0;

  return (
     <div className="wishlist-container">
    <div className="input-row">
      <input
        type="text"
        value={todo}
        onChange={onTodoInputChange}
        placeholder="Add a new task"
      />
      <button onClick={onAddtodoClick}>Add</button>
    </div>

    <div className="progress-container">
      <div className="progress-circle">
        <svg width="80" height="80">
          <circle
            cx="40"
            cy="40"
            r="35"
            stroke="#eee"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r="35"
            stroke="#00a8ff"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 35}
            strokeDashoffset={2 * Math.PI * 35 * (1 - progress / 100)}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
          <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="16">
            {progress}%
          </text>
        </svg>
      </div>

      {progress === 100 ? (
        <>
          <p>🎉 Congratulations, You did it! ❤️</p>
          <button className="reset-button" onClick={() => setTodoList([])}>
            Reset
          </button>
        </>
      ) : (
        <p>You are {progress}% closer to your goals</p>
      )}
    </div>

    <div className="todo-list">
      {todoList.map((item) => (
        <div key={item.id} className="todo-item">
          <label>
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => onTodoCheckChange(item.id)}
            />
            <span className={item.isCompleted ? "strike" : ""}>
              {item.todo}
            </span>
          </label>
          <button onClick={() => onDeleteClick(item.id)}>✕</button>
        </div>
      ))}
    </div>
  </div>
  );
}

export default App;
