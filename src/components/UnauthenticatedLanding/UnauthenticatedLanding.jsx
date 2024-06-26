import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, CustomCard } from '../index';
import databaseServiceObj from '../../appwrite/conf';
import TET from '../../assets/images/TET.jpg'
import TSS from '../../assets/images/TSS.jpg'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';



const UnauthenticatedLanding = () => {
    const [post1info,setpost1info]=useState()
    const [post2info,setpost2info]=useState()
    useEffect(()=>{
        databaseServiceObj.getPost("the-setting-sun").then(post=> setpost1info(post))
        databaseServiceObj.getPost("the-setting-sun").then(post=> setpost2info(post))
    },[post2info])

    return (
        <div className='w-full bg-gray-900 text-white py-8'>
            <Container>
                <div className='text-center'>
                    <h1 className='text-4xl font-bold mb-4'>Welcome to Our Blog!</h1>
                    <p className='text-lg mb-8'>Discover amazing content on various topics. Join us today to unlock the full experience.</p>
                    <div className='flex justify-center space-x-10 mb-8'>
                        <Link to="/login">
                            <button
                                className="text-xl gradient-button"
                            >
                                Log In
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button 
                                className='text-xl gradient-button'
                                >
                                Sign Up
                            </button>
                        </Link>
                    </div>
                    <h2 className='text-2xl font-bold mb-4'>Featured Posts</h2>
                    <div className='flex gap-10 flex-wrap justify-center pt-2 pb-10'>
                        <div className=' bg-black rounded-xl shadow-lg shadow-gray-700 hover:bg-gray-800 transition duration-300' >
                            <Card sx={{ maxWidth: 345,borderRadius:2,border:1,borderColor:"white",background:"transparent"}}>
                            <CardActionArea sx={{background:"transparent"}}>
                                <CardMedia sx={{maxHeight:165}}
                                component="img"
                                height="140"
                                image={TSS}
                                alt="Sun"
                                />
                                <CardContent sx={{backgroundColor:"black",background:"transparent",color:"white"}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    The Setting Sun
                                </Typography>
                                
                                </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div className=' bg-black rounded-xl shadow-lg shadow-gray-700 hover:bg-gray-800 transition duration-300' >
                            <Card sx={{ maxWidth: 345,borderRadius:2,border:1,borderColor:"white",background:"transparent"}}>
                                <CardActionArea sx={{background:"transparent"}}>
                                    <CardMedia sx={{maxHeight:165}}
                                    component="img"
                                    height="140"
                                    image={TET}
                                    alt="tss"
                                    />
                                    <CardContent sx={{backgroundColor:"black",background:"transparent",color:"white"}}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        The Evolution Of Tech
                                    </Typography>
                                    
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </div>
                    <h2 className='text-2xl font-bold mb-4'>Why Join Us?</h2>
                    <ul className='list-disc list-inside'>
                        <li>Create your own posts</li>
                        <li>Explore a wide range of topics</li>
                        <li>Engage with a community of like-minded readers</li>
                    </ul>
                </div>
            </Container>
        </div>
    );
};

export default UnauthenticatedLanding;
