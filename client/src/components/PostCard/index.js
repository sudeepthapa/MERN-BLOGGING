import {Card, Button} from 'react-bootstrap';
const PostCard = () => {
    return (
        <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">Read Article</Button>
            </Card.Body>
        </Card>
    )
}

export default PostCard;