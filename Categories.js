import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';
import { useState, useEffect } from 'react';
import { fetchdata } from './FetchData';
import FilterCategories from './FilterCategories';
import { fetchcategories } from './FetchCategories';


export default function Categories({productList}) {
    const [alignment, setAlignment] = React.useState('left');
  
    const handleAlignment = (_event, newAlignment) => {
      setAlignment(newAlignment);
    };

    const [input, setInput] = useState('')
    const [list, setList] = useState([productList]);
    const [categoriesList, setCategoriesList] = useState([]);
   
    const handleInput = (e) => {
      //console.log(e.target.value)
      setInput(e.target.value.toLowerCase())
    }

    useEffect(() => {
      fetchcategories()
        .then(res => {
          console.log(res);
          setCategoriesList(res);
        });
   }, []);

    return (
      <div>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"

        >
          <ToggleButton value={"smartphones"} onClick={e => handleInput(e, "value")}>
              SmartPhones
          </ToggleButton>
          <ToggleButton value={"laptops"} onClick={e => handleInput(e, "value")}>
            Laptops
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            Kitchen
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified" disabled>
            Watches
          </ToggleButton>
        </ToggleButtonGroup>
        <FilterCategories searchCategory={input} list={list} />
      </div>
    );
  }