import React from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './helpers/PrivateRoute';
import {useDispatch, useSelector} from 'react-redux';
import { getUserInfo } from './store/features/authSlice';
function App() {
  const { isAuthenticating } = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  const userId = localStorage.getItem('user_id');
  
  React.useEffect(()=>{
      if(userId){
          dispatch(getUserInfo(userId))
      }
  }, [userId])

  if(isAuthenticating){
    return <h1>Loading ...</h1>
  }

  return (
    <React.Fragment>
      <Toaster />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/blog' element={<HomePage/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
