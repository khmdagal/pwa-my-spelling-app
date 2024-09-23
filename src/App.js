import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';

import ProtectedRoutes from './pages/ProtocedRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">Spelling Practice App</header>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/admin-dashboard' element={
            <ProtectedRoutes >
              <AdminDashboard />
            </ProtectedRoutes>
          }
          />
          <Route exact path='/student-dashboard' element={
            <ProtectedRoutes >
              <StudentDashboard />
            </ProtectedRoutes>
          }
          />
        </Routes>

      </div>
    </Router>

  );
}

export default App;
