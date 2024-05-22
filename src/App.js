import React, { useState } from 'react';
import Home from './Home';
import Login from './Login';

export  default function App() {

  const [reset, setReset] = useState(0);

  return (
    <>
      {
        localStorage.getItem("user") 
        ? 
        <Home reset={reset} setReset={setReset} /> 
        : 
        <Login reset={reset} setReset={setReset} />
      }
    </>
  );
}