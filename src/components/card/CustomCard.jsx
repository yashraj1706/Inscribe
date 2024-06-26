import React from 'react'
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
    <div className=' bg-black rounded-xl shadow-lg shadow-gray-700 hover:bg-gray-800 transition duration-300' >
        <Card sx={{ maxWidth: 345,borderRadius:2,border:1,borderColor:"white",background:"transparent"}}>
          <CardActionArea sx={{background:"transparent"}}>
            <CardMedia sx={{maxHeight:165}}
              component="img"
              height="140"
              image={databaseServiceObj.getFilePreview(featuredImage)}
              alt={title}
            />
            <CardContent sx={{backgroundColor:"black",background:"transparent",color:"white"}}>
              <Typography gutterBottom variant="h5" component="div">
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