import React from 'react';
import { Link } from 'react-router-dom';
import {Container} from '../index';

const NoPosts = ( {user} ) => {
    return (
        <div className='w-full min-h-[calc(100vh)] flex items-center bg-gray-900 text-white py-8'>
            <Container>
                <div className='text-center'>
                    <h1 className='text-4xl font-bold mb-4'>Welcome back, {user}!</h1>
                    <p className='text-lg mb-8'>It looks like there are no posts to show at the moment.</p>
                    <div className='mb-8'>
                        <Link to="/add-post">
                            <button className='gradient-button'>Create Your First Post</button>
                        </Link>
                    </div>
                    <h2 className='text-2xl font-bold mb-4'>Tips for Creating Great Content</h2>
                    <ul className='list-disc list-inside'>
                        <li>Write about what you love</li>
                        <li>Engage with your audience</li>
                        <li>Share your posts on social media</li>
                    </ul>
                </div>
            </Container>
        </div>
    );
};

export default NoPosts;
