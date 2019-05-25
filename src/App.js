import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom'
import router from './router'


import Header from './Components/Header'

function App() {
  return (
    <HashRouter className="App">
      <Header/>
      {router}
    </HashRouter>
  );
}

export default App;
