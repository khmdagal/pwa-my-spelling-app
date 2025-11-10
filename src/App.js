import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';
import PracticeMyAssignment from './assignments/myAssignments/PracticeMyAssignments';
import Header from './component/Header';
import ProtectedRoutes from './pages/ProtocedRoutes';
import './css/GlobalStyle.css'
import classes from './css/LogInAndSingUp.module.css'

function App() {
  return (
    <Router>
      <Header />
      <div className={`${classes.app}`}>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/signUp' element={<SignUp />} />
          <Route exact path='/login' element={<Login />} />
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
