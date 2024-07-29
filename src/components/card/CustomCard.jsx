import React, { useEffect } from 'react'
import databaseServiceObj from '../../appwrite/conf'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


function CustomCard({$id,title,featuredImage}) {
  
  return (
    <Link to={`/post/${$id}`}>
    <div className=' bg-black  rounded-xl shadow-lg shadow-gray-700 hover:bg-gray-800 transition duration-300' >
        <Card sx={{ maxWidth: 310,borderRadius:2,border:1,borderColor:"white",background:"transparent"}}>
          <CardActionArea sx={{background:"transparent"}}>
            <CardMedia sx={{maxHeight:165,height:165,objectFit:"cover"}}
              component="img"
              height="140"
              image={databaseServiceObj.getFilePreview(featuredImage).href}
              alt={title}
            />
            <CardContent sx={{backgroundColor:"black",background:"transparent",color:"white"}}>
              <Typography sx={{height:50,display:"flex",justifyContent:"center",alignItems:"center"}} gutterBottom variant="" component="div">
                {title}
              </Typography>
              
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Link>
  )
}

export default CustomCard