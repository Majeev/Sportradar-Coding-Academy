import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Button } from '../components/index';

function NotFound() {
    const navigate = useNavigate();

    return (
        <Container>
            <div className='position-absolute top-50 start-50 translate-middle text-center w-100 '>
                <h1 className='font-xlarge'>Page doesn't exist.</h1>
                <p className='font-medium mb-4'>Please, check the URL</p>
                <Button
                    title='Go back to Home'
                    onClick={() => navigate('/')}
                    className='bg-primary text-light scale'
                />
            </div>
        </Container>
    );
}

export default NotFound;
