import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Hero from './Hero';
import LatestBlogs from './LatestBlogs';
import './style.css';
const HomePage = () => {
    return (
        <React.Fragment>
            <Hero />
            <LatestBlogs />
            <Container className="my-5">
                <h4 className="text-secondary">Most liked blogs by our readers</h4>
            </Container>
            <LatestBlogs />
            <Footer />
        </React.Fragment>
    )
}

export default HomePage;