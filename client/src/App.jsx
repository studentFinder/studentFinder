
import { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from './App.module.css';
import Header from './component/header/header';
import { useAuth } from './context/AuthContent';
import CourseList from './page/courseList';
import Home from './page/home';
import Login from './page/login';
import Profile from './page/profile';
import StudentList from './page/studentList';

function App({dataService}) {

  const navigate = useNavigate();
  const location = useLocation();


  const { user, logout, signup, signin } = useAuth();
  //const [user, setUser] = useState(true);

  const handleLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      logout();
      //setUser(false);
      
      navigate('/');

    }
  };

  const handleSigninPath = () => {
    navigate('/login');
  }

  const handleSignup = (username, password, name, email) => {
    signup(username, password, name, email);
    user && navigate(-1);
  }

  const handleSignin = (username, password) => {
    signin(username, password);
    user && navigate(-1);
  }
  return (
    <div>
      <Header  handleLogout={handleLogout}  handleSignin={handleSigninPath} user={user} />
      <div className={styles.body}>
          <div className={styles.content}>
          
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CourseList dataService={dataService}  />}/>
              <Route path="/courses/departments/:departmentId" element={<CourseList dataService={dataService} />}/>
              <Route path="/courses/:courseId" element={<StudentList dataService={dataService}/>} />
              <Route path="/courses/account/profile" element={<Profile dataService={dataService} />} />
              <Route path="/courses/account/profile/departments/:departmentId" element={<Profile dataService={dataService} />} />

              <Route path="/login" element={<Login onLogin={handleSignin} onSignUp={handleSignup} dataService={dataService} />} />

            </Routes>

            
          </div>
          <div className={styles.widget}>
              Widget
          </div>
            
    
      </div>
      
      
      
    </div>
  );
}

export default App;
