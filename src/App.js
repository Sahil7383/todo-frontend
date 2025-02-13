import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/todos"; // Backend URL

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    const res = await axios.post(API_URL, { text });
    setTodos([...todos, res.data]);
    setText("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>To-Do List</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
