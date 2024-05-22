import React, { useEffect, useState } from 'react';

export  default function Home(props) {

  const { reset, setReset } = props;
  const [todos, setTodos] = useState();
  const [todo, setTodo] = useState();

  useEffect(() => {
    const formData = new FormData();
    formData.append("action", "todos");
    fetch(`http://localhost/todosFile/`, {
      method: "POST",
      body: formData,
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => setTodos(data))
  }, [])

  const deleteTodo = (id) => {
    const formData = new FormData();
    formData.append("action", "delete-todos");
    formData.append("id", id);
    fetch(`http://localhost/todosFile/`, {
      method: "POST",
      body: formData,
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      const newTodo = todos.filter((todo) => todo.todo_id != data)
      setTodos(newTodo);
    })
  };

  const changeTodo = (id) => {
    const formData = new FormData();
    formData.append("action", "update-todos");
    formData.append("id", id);
    fetch(`http://localhost/todosFile/`, {
      method: "POST",
      body: formData,
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      const newTodo = todos.map((todo) => {
        if (todo.todo_id == data)
          todo.contextStatus = !todo.contextStatus;
        return todo;
      })
      setTodos(newTodo);
    })
  };

  const addTodo = () => {
    if (!todo){
      alert("Text not space");
      return;
    }
    const formData = new FormData();
    formData.append("action", "add-todos");
    formData.append("context", todo);
    fetch(`http://localhost/todosFile/`, {
      method: "POST",
      body: formData,
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setTodo("");
      setTodos([data, ...todos]);
    })
  };

  const logout = () => {
    localStorage.removeItem("user");
    setReset(!reset);
  }

  return (
    <>

        <div className='home'>
            <h1>ToDo List</h1>
            <button onClick={logout}>Log-Out</button>
        </div>

        
        <input value={todo} type="text" placeholder='ToDo Write' onChange={(e) => setTodo(e.target.value)} />
        <button onClick={addTodo}>EKLE</button>

            {
                todos && (
                <ul>
                    {
                    todos.map((element) => (
                    <>
                        <li className={element.contextStatus ? 'complate' : ""} key={element.todo_id}>
                        <span onClick={() => changeTodo(element.todo_id)}>{element.context}</span>
                        <button onClick={() => deleteTodo(element.todo_id)}>SIL</button>
                        </li>
                    </>
                    ))
                    }
                </ul>
                )
            }
    </>
  );
}