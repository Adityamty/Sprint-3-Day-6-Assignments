import React, { useReducer, useState } from 'react';

// Define action types
const ACTIONS = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo',
  TOGGLE_TODO: 'toggle-todo'
};

// Reducer function to manage todos state
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, { id: Date.now(), text: action.payload.text, completed: false }];
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id);
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    default:
      return todos;
  }
}

// TodoList component
function TodoList() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState('');

  function handleAddTodo() {
    if (text.trim() === '') return;
    dispatch({ type: ACTIONS.ADD_TODO, payload: { text } });
    setText('');
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Todo List</h2>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new todo"
        style={{ padding: '8px', width: '70%' }}
      />
      <button onClick={handleAddTodo} style={{ padding: '8px 12px', marginLeft: '8px' }}>Add</button>

      <div style={{ marginTop: '16px' }}>
        <strong>Completed:</strong> {completedCount} &nbsp;&nbsp;
        <strong>Pending:</strong> {pendingCount}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid #ddd',
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            <span onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}>
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })}
              style={{ marginLeft: '12px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
