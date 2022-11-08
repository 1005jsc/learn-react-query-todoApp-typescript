import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import TodoList from './Pages/TodoList';
import TodoPage from './Pages/TodoPage';

function App() {
  return (
    <Routes>
      <Route path='' element={<TodoList />} />

      <Route path='/detail' element={<TodoPage />} />
      <Route path='/detail:id' element={<TodoPage />} />
    </Routes>
  );
}

export default App;
