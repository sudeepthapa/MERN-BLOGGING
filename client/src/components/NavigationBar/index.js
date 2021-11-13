import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import { getUserInfo, logOut } from '../../store/features/authSlice';
const NavigationBar = () => {
    const {isLoggedIn} = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    React.useEffect(()=>{
        const userId = localStorage.getItem('user_id');
        if(userId){
            dispatch(getUserInfo(userId));
        }
    }, [])
    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <NavLink className="nav-link" to='/'><h4>Lets Blog</h4></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto align-items-center">
                        <NavLink className="nav-link" to="/blog">Blogs</NavLink>
                        {isLoggedIn && <NavLink className="nav-link" to="/profile">Profile</NavLink>}
                        {!isLoggedIn && <NavLink className="nav-link" to="/login">Login</NavLink>}
                        {!isLoggedIn && <NavLink className="nav-link" to="/register"> <Button>Get Started</Button> </NavLink>}
                        {isLoggedIn && <Nav.Link onClick={()=>dispatch(logOut())}>Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;