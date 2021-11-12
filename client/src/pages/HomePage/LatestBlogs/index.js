const { Container } = require("react-bootstrap")
const { default: PostCard } = require("../../../components/PostCard")

const LatestBlogs = () => {
    return (
        <Container className="mt-4">
            <div className='row'>
                <div className="col-md-4">
                    <PostCard />
                </div>
                <div className="col-md-4">
                    <PostCard />
                </div>
                <div className="col-md-4">
                    <PostCard />
                </div>
            </div>
        </Container>
    )
}

export default LatestBlogs;