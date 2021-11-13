import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../constants/status";
import { clearStatus, registerAction } from "../../../store/features/authSlice";
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const initialState = {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: ''
    };
    const [userDetails, setUserDetails] = useState(initialState);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {status, error} = useSelector(state=>state.auth)

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

        const error = {};

        if(userDetails.password !== userDetails.confirmPassword){
            error['passwordMatch'] = 'Password Donot Match';
        }

        if(userDetails.fullname === ''){
            error['fullname'] = 'Fullname is required.'
        }

        if(Object.keys(error).length > 0){
            setErrors(error);
        }else{
            setErrors({});
            const {confirmPassword, ...payload} = userDetails;
            const formData = new FormData();
            Object.keys(payload).forEach(key=>{
                formData.append(key, payload[key])
            })
            dispatch(registerAction(formData));
        }

    }

    useEffect(()=>{
        if(status === Status.ERROR){
            toast.error(error);
        } else if(status === Status.SUCCESS){
            toast.success('User registered successfully.')
            resetForm();
            dispatch(clearStatus());
            navigate('/login');
        }
    }, [status])

    const handlePhoto = (e) => {
        setUserDetails({...userDetails, photo: e.target.files[0]});
    }

    return (
        <Container className='mt-4 d-flex justify-content-center'>
            <Card className='p-3 w-50'>
                <h3 className="text-muted">Register</h3>
                <hr></hr>
                <Form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={userDetails.fullname} type="name" name='fullname' placeholder="Enter Full Name" onChange={handleUserDetailChange} />
                        {errors.fullname && <Form.Text className="text-danger">
                            {errors.fullname}
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={userDetails.email} required type="email" placeholder="Enter email" name='email' onChange={handleUserDetailChange}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required value={userDetails.password} type="password" placeholder="Password" name='password' onChange={handleUserDetailChange}/>
                        {errors.passwordMatch && <Form.Text className="text-danger">
                            {errors.passwordMatch}
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control value={userDetails.confirmPassword} required type="password" placeholder="Confirm Password" name='confirmPassword' onChange={handleUserDetailChange}/>
                        {errors.passwordMatch && <Form.Text className="text-danger">
                            {errors.passwordMatch}
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Profile</Form.Label>
                        <Form.Control onChange={handlePhoto} accept=".png, .jpg, .jpeg" type="file" name='photo'/>
                    </Form.Group>
                
                    <Button variant="primary" type="submit">
                        {status === Status.PENDING ? <Spinner size="sm" animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                            </Spinner> : 'Register'}
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default Register;