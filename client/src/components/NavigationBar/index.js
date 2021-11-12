import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <NavLink className="nav-link" to='/'><h4>Lets Blog</h4></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto align-items-center">
                        <NavLink className="nav-link" to="/blog">Blogs</NavLink>
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-link" to="/register"> <Button>Get Started</Button> </NavLink>
                        {/* <Nav.Link href="#link">Logout</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;