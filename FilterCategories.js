//FilterCategories 

import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/system';
import { Paper, Box, Typography, CardContent, ToggleButton, Autocomplete, TextField, useScrollTrigger } from '@mui/material';
import Lowtohigh from './Lowtohigh';

const cards={
 
    float: 'left',
    padding: '20px'
  };
  
  const cardcontainer={
    width: '50%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
      
  };

export default function FilterCategories({searchCategory, list}) {
    console.log(list);
    const [filteredCategoryList, setFilteredCategoryList] = useState(list);
    const [filtertype, setFilterType] = useState("");

    useEffect (( )=> {
        console.log(list);
        console.log(searchCategory);
        const filteredList = list.filter((element) => {
            console.log(element);
            if (searchCategory === '') {
                return element;
            }
            else {
             //console.log(element.category.toLowerCase().includes(searchCategory));
                return element.category.toLowerCase().includes(searchCategory)
            }
         });
         setFilteredCategoryList(filteredList);
    }, [filtertype]);
    
    // e is filter type
    const handleInput = (e) => {
        //console.log(e.target.value);
        setFilterType(e.target.value);
        console.log("In handleInput");
        console.log(filtertype);
        console.log(filteredCategoryList);
    }

    const filters=['Default','Low To High','High To Low','Nearest'];
    return (
        <Box>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={filters}
            renderInput={(params) => <TextField {...params}
              label="Apply Filters"
              onSelect={handleInput}
              sx={{
                width: 200,
                marginLeft: '1000px',
              }} />} />

            <Stack spacing={2}
            sx={{
              maxHeight: 500,
              display:'block',
              flexDirection:'row',
              width:'40%',
              justifyContent:'space-between',
              padding:5,
            }}>   
                {filteredCategoryList.map((item) => (
                    <Paper key={item.id}
                    sx={{
                        textAlign:'left'
                    }}  >

             
                        <div style={cardcontainer}>
                        <div style={cards}>
                           <Typography><strong>Title:</strong> {item.title}</Typography>
                           <Typography><strong>Desc:</strong> {item.description}</Typography>
                           <Typography><strong>Price:</strong> {item.price}</Typography>
                           <Typography><strong>Rating:</strong> {item.rating}</Typography>
                           <Typography><strong>Brand:</strong> {item.brand}</Typography>
                           </div>
                           </div>
                    </Paper>
                ))}
            </Stack>
        </Box>
        );
}