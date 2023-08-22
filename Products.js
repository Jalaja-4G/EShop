import { useState, useEffect } from 'react';
import './App.css';
import { Typography, Box, TextField, Autocomplete,Paper } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { fetchdata } from './FetchData';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import { Stack } from '@mui/system';
import ProductDetails from './ProductDetails';
import { useSelector } from "react-redux";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { fetchcategories } from './FetchCategories';

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

const deletemodal = {
  display: "none", /* Hidden by default */
  position: "fixed", /* Stay in place */
  zIndex: 1, /* Sit on top */
  paddingTop: "100px", /* Location of the box */
  left: 0,
  top: 0,
  width: "100%", /* Full width */
  height: "100%", /* Full height */
  overflow: "auto", /* Enable scroll if needed */
  backgroundColor: "rgb(0,0,0)", /* Fallback color */
  backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


var idselected;

function Products() {
  const [input, setInput] = useState()
  const [productList, setProductList] = useState([]);
  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCatogory] = useState("");
  const [filtertype, setFilterType] = useState('default');
  const [alignment, setAlignment] = useState('left');
  const [state, setState] = useState(0);
  const navigate = useNavigate()
  const [productdelete, setDeleteProduct] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (e) => {
    var deletedId = e.target.value;
    setDeleteProduct(deletedId);
    console.log(deletedId);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const isUserLoggedIn = useSelector((state) => {
    return state.users.isLoggedIn
  });

  const isAdmin = useSelector((state) => {
    return state.users.isAdmin
  });

  const searchInput = useSelector((state) => {
    return state.products.searchInput
  })

  const changeState = (event) => {  
    idselected=event.target.value;
    setState(idselected); 
    // ProductDetails(idselected);

    const product = list.filter((element) => {
      if(element.id == idselected) {
        return element;
      }
    });

    navigate({
      pathname: "/product/",
      search: `?id=${idselected}`, // inject code value into template
      list:`${product}`
    });

    if(idselected!=0)
      <ProductDetails id={idselected} />
   }; 


   const modifyProduct = (e) => {
    idselected=e.target.value;
    e.preventDefault();
    navigate({
      pathname: "/product/edit",
      search: `?id=${idselected}`, // inject code value into template
    });
  }; 
  

  const deleteProduct = (event) => {
    event.preventDefault();
    console.log(productdelete);
    navigate({
      pathname: "/product/delete",
      search: `?id=${productdelete}`, // inject code value into template
    });
  };

  const handleAlignment = (_event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleInputCategory = (_event, category) => {
    setCatogory(category);
    //setTogglebutton('true');
  }

  const filters=['Default','Low To High','High To Low','Newest'];
    
  // e is filter type
  const handleInputFilter = (_event, newValue) => {
    console.log("In handleInputFilter");
    if (newValue == null) {
      setFilterType("");
    } else {
    setFilterType(newValue);
    }
    console.log(filtertype);
  }

  function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  

  useEffect(() => {
    fetchdata()
      .then(res => {
        setProductList(res)
        setList(res)
        console.log(res)
      });
    fetchcategories()
    .then(res => {
      var cList = ["all", ...res]
      setCategoryList(cList)
      console.log(res)
    });
  }, []);

  useEffect(()=> {
    console.log(input)
    console.log(list)
    console.log(productList)
    if (input === '') {
      setList(productList);
    }
    else {
      const filteredList = list.filter((element) => {
        return element.name.toLowerCase().includes(input);
      });
      console.log(filteredList)
      setList(filteredList);
    }}, [input]);

  useEffect(() => {
    if (category === "all") {
      setList(productList);
    }
    else {
        console.log(productList)
        const categorizedList = productList.filter((element) => {
          if (element.category.toLowerCase().includes(category.toLowerCase())) {
            return element;
        }
      });
      setList(categorizedList);
      //console.log(categorizedList);
    }
  }, [category]);

  useEffect(()=> {
    if(filtertype === 'Default') {
      setList(productList);
    }
    else 
    {
      let sortedList = [...list];
      if (filtertype === 'Low To High') {
        sortedList.sort((a,b) => {
          return a.price-b.price;
        });
      }
      else if(filtertype === 'High To Low') {
        sortedList.sort((a,b) => {
          return b.price-a.price;
        });
      }
      else if(filtertype === 'Newest') {
       // console.log(sortedList.sort());
          //return b.updatedAt-a.updatedAt;
          sortedList.sort(GetSortOrder("updatedAt"));
      }
      setList(sortedList);
    }
  },[filtertype]);

  useEffect(()=> {
      const itemDetails = list.filter((element) => {
        console.log(state);
        if(element.id == state) {
          console.log('hi');
          return element;
        }
      });
      setList(itemDetails);
      //console.log(itemDetails);
    }, [state]);

  return (
    <>
      <div>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          {categoryList.map((item, index) => (
            <ToggleButton key={index} value={item} onClick={handleInputCategory}>
            {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box >
          <Autocomplete
            disablePortal
            id="combo-box-demo1"
            onInputChange={handleInputFilter}
            options={filters}
            renderInput={(params) => <TextField {...params}
              label="Apply Filters"
              sx={{
                width: 200,
                marginLeft: '1000px',
              }} />} />;

          <Stack spacing={2}
            sx={{
              maxHeight: 500,
              display: 'block',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
            }}>

            {list.filter((item) => {return item.name.toLowerCase().includes(searchInput)}).map((item, index) => (
              <Paper key={index}
                sx={{
                  textAlign: 'left'
                }}>

                <div style={cardcontainer}>
                  <div style={cards}>
                    <Typography><strong>Title:</strong> {item.name}</Typography>
                    <Typography><strong>Desc:</strong> {item.description}</Typography>
                    <Typography><strong>Price:</strong> {item.price}</Typography>
                    <Typography><strong>Category:</strong> {item.category}</Typography>
                    {isAdmin && <button style={{marginLeft:"10px", marginTop:"5px", backgroundColor: "#008CBA", color:"white", padding:"10px 20px"}} value={index} onClick={modifyProduct}>Modify</button>}
                    {isAdmin && <button style={{marginLeft:"10px", marginTop:"5px", backgroundColor: "#008CBA", color:"white", padding:"10px 20px"}} value={index} style={{ marginLeft: "20px" }} onClick={handleOpen}>Delete</button>}
                    {!isAdmin && isUserLoggedIn && <button style={{marginLeft:"10px", marginTop:"5px", backgroundColor: "#008CBA", color:"white", padding:"10px 20px"}}  value={index} onClick={changeState}>Buy Now</button>}

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          Are you sure you want to delete this product?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <Button onClick={deleteProduct} type="submit">Yes</Button>                                      </Typography>
                      </Box>
                    </Modal>
                  </div>
                </div>
              </Paper>
            ))}
          </Stack>
        </Box>
      </div>
    </>
 );
}

export {idselected};
export default Products;