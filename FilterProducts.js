import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/system';
import { Paper, Box, Typography, CardContent, ToggleButton } from '@mui/material';

const cardcontainer={
  width: '500px',
  padding: '30px',
 };

 
export default function FilterPrducts({searchstring, list}) {
const filteredList = list.filter((element) => {
   if (searchstring === '') {
       return element;
   }
   else {
       return element.title.toLowerCase().includes(searchstring)
   }
});



const cardcontainer={
  width: '500px',
  padding: '30px',
};


 return (
   <Box>
     <Stack spacing={3}
     sx={{
       maxHeight: 100,
       display:'block',
       flexDirection:'row',
       width:'40%',
       justifyContent:'space-between',
       padding:5,
     }}
    

     >
     {filteredList.map((item) => (
               <Paper key={item.id}
               sx={{
                   textAlign:'left',
               }}  >
                <span style={cardcontainer}>
                   <Typography><strong>Title:</strong> {item.title}</Typography>
                   <Typography><strong>Desc:</strong> {item.description}</Typography>
                   <Typography><strong>Price:</strong> {item.price}</Typography>
                   <Typography><strong>Rating:</strong> {item.rating}</Typography>
                   <Typography><strong>Brand:</strong> {item.brand}</Typography>
                </span>
               </Paper>
           ))}

</Stack>
   </Box>
 )
}
