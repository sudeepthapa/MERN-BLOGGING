import { useEffect, useState } from "react";

import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../constants/status";
import { clearStatus, loginAction } from "../../../store/features/authSlice";
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const initialState = {
        email: '',
        password: '',
    };
    const [userDetails, setUserDetails] = useState(initialState);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {status, error, isLoggedIn} = useSelector(state=>state.auth)

    const handleUserDetailChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const resetForm = () => {
        setUserDetails(initialState);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAction(userDetails));
    }


    useEffect(()=>{
        if(status === Status.ERROR){
            toast.error(error);
        } else if(status === Status.SUCCESS){
            toast.success('Login Successful.')
            resetForm();
            dispatch(clearStatus());
            navigate('/');
        }
    }, [status])

    useEffect(()=>{
        if(isLoggedIn){
            navigate('/');
        } 
    }, [isLoggedIn])

    return (
        <Container className='mt-4 d-flex justify-content-center'>
            <Card className='p-3 w-50'>
                <h3 className="text-muted">Login</h3>
                <hr></hr>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required value={userDetails.email} onChange={handleUserDetailChange} type="email" placeholder="Enter email" name='email' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required value={userDetails.password} onChange={handleUserDetailChange} type="password" placeholder="Password" name='password' />
                    </Form.Group>                
                    <Button variant="primary" type="submit">
                        {status === Status.PENDING ? <Spinner size="sm" animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                            </Spinner> : 'Login'}
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default Login;