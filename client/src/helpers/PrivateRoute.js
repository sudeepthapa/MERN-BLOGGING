import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function PrivateRoute({ children }) {
    const auth = useSelector(state=>state.auth.isLoggedIn);
    const hasToken = localStorage.getItem('token');
    return (auth || hasToken) ? children : <Navigate to="/login" />;
}

export default PrivateRoute;