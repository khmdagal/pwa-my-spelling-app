import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">Spelling Practice App</header>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
        </Routes>

      </div>
    </Router>

  );
}

export default App;
