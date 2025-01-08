import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './pages/LogIn';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';
import PracticeMyAssignment from './assignments/myAssignments/PracticeMyAssignments';

import ProtectedRoutes from './pages/ProtocedRoutes';
import './css/GlobalStyle.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">Spelling Practice App</header>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/signUp' element={<SignUp />} />
          <Route exact path='/logIn' element={<LogIn />} />
          <Route exact path='/admin_dashboard' element={
            <ProtectedRoutes >
              <AdminDashboard />
            </ProtectedRoutes>
          }
          />
          <Route exact path='/student_dashboard' element={
            <ProtectedRoutes >
              <StudentDashboard />
            </ProtectedRoutes>
          }
          />
          <Route exact path='/practicePage' element={
            <ProtectedRoutes >
              <PracticeMyAssignment />
            </ProtectedRoutes>
          } />
        </Routes>

      </div>
    </Router>

  );
}

export default App;
