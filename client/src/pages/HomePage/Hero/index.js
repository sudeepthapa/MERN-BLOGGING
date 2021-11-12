import { Container, Button } from 'react-bootstrap'
import './hero.css'
const Hero = () => {
    const bgi = {
        backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.5) 100%), url('https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
    return <div className='hero' style={bgi}>
        <Container className='h-100 py-4'>
            <div className='h-100 d-flex flex-column justify-content-end align-items-start py-4' style={{width: '30%'}}>
                <h2 className="text-light">Time to get Your house Clean and in Order</h2>
                <p className="text-muted">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.</p>
                <Button>Read Article</Button>
            </div>
        </Container>
    </div>
}

export default Hero;