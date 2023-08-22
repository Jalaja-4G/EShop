import { useState, useEffect } from 'react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchdata } from './FetchData';
import Products from './Products';
import { Typography, Box, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { idselected } from './Products';
import { useDispatch } from 'react-redux';
import { createOrder } from './ProductReducer';

const cards={
 
    float: 'left',
    padding: '20px'
  };
  
  const cardcontainer={
    width: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
      
  };

  const buttons = {
    textDecoration:'none',
    marginLeft: '20px'
  }

var quantity;
export default function ProductDetails() {
    
    const [product, setProduct] = useState({});
    const [searchParams] = useSearchParams(); 
    const productId = searchParams.get("id");
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if(count>1) {
      setCount(count - 1);
    }
  }; 
  
  const orderplaced = () => {
    console.log("Selected product: " + product._id + ":" + product.name)
    quantity = count;
    dispatch(createOrder(product))
    navigate({
      pathname: "/orders/",
      search: `?id=${product._id}`
    });
  }

    useEffect(() => {
        fetchdata()
          .then(res => {
            console.log(productId)
            console.log(res)
            var ans=res[productId];
            console.log(res[productId])
            setProduct(ans);
            console.log(product);
          });
     }, []);

    

//console.log(list);

return (
<Box>
            <Stack spacing={2}
            sx={{
              maxHeight: 500,
              display:'block',
              flexDirection:'row',
              width:'100%',
              justifyContent:'space-between',
              padding:5,
            }}>  
                 

                      <div style={cardcontainer}>
                        <div style={cards}>
                           <Typography><strong>Title:</strong> {product.name}</Typography>
                           <Typography><strong>Desc:</strong> {product.description}</Typography>
                           <Typography><strong>Price:</strong> {product.price}</Typography>
                           <Typography><strong>Category:</strong> {product.category}</Typography>
                           <Typography><strong>Manufacturer:</strong> {product.manufacturer}</Typography><br></br>
                           <Typography><img style={{width:"200px", height:"200px"}} src={product.imageURL} alt="No Image Found"/></Typography>
                           <Typography><button style={{marginLeft:"10px", marginRight:"10px",backgroundColor: "#008CBA",color:"white", padding:"5px 10px"}} onClick={incrementCount}>+</button>{count}<button style={{marginLeft:"10px", backgroundColor: "#008CBA", color:"white", padding:"5px 10px"}} onClick={decrementCount}>-</button></Typography><br></br>
                           <Typography><button style={{marginLeft:"10px", backgroundColor: "#008CBA", color:"white", padding:"10px 20px"}} onClick={orderplaced}>Place Order</button></Typography>
                           <div id="OrderPlaced"></div>
                           
                        </div>
                      </div>
            </Stack>
        </Box>
);
    }

    export {quantity};