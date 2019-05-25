import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux'
import store from './redux/store'



import Header from './Components/Header'

function App() {
  return (
    <Provider store={store}>
      <HashRouter className="App">
        <Header/>
        {router}
      </HashRouter>
    </Provider>
  );
}

export default App;
