import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import CreateQuestion from './components/CreateQuestion';
import CreateQuize from './components/CreateQuize';
import {Layout} from 'antd';
const { Content } = Layout;

function App() {
  const [userData, setUserData] = useState('');
  const cookie = new Cookies();

  const logoutUser = () => {
    localStorage.clear();
    cookie.remove('token');
    setUserData('');
  }



  return (
    <>
      
          <Navbar userData={userData} logoutUser={logoutUser} />
          <Switch>
            <Route exact path='/'>
              <Home userData={userData} />
            </Route>

            <Route path='/contact'>
              <Contact />
            </Route>

            <Route path='/login'>
              <Login setUserData={setUserData} />
            </Route>

            <Route path='/signUp'>
              <SignUp />
            </Route>

            <Route path='/about'>
              <About />
            </Route>

            <Route path='/createQuestion'>
              <CreateQuestion />
            </Route>

            <Route path='/createQuize'>
              <CreateQuize />
            </Route>

            <Route path='/createQuize'>
              <About />
            </Route>

            <Route >
              <ErrorPage />
            </Route>
          </Switch>
          <ToastContainer />
    </>
  );
}

export default App;
