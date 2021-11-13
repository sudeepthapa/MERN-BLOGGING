import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import './profile.css';
import ProfileHeader from "./ProfileHeader";
const Profile = () => {

    const {user} = useSelector(state=>state.auth);

    return (
        <Container className='w-100'>
            <Card className='p-4 w-100 d-flex justify-content-center'>
                <ProfileHeader user={user || {}} />
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="pt-4 text-muted">My Posts</h4>
                    <Button>Create Post</Button>
                </div>
                <hr/>
            </Card>
        </Container>
    )
}

export default Profile;