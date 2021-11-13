import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './helpers/PrivateRoute';
function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
