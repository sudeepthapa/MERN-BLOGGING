import { Container, Form, Button, Card } from "react-bootstrap";

const Login = () => {
    return (
        <Container className='mt-4 d-flex justify-content-center'>
            <Card className='p-3 w-50'>
                <h3 className="text-muted">Login</h3>
                <hr></hr>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' />
                    </Form.Group>                
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default Login;