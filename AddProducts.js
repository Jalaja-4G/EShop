import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_ENDPOINT } from './api-endpoints';
import { useSelector } from "react-redux";

import {
    Grid,
    TextField,
    Paper,
    Button
  } from "@mui/material";


function AddProducts() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")  
  const [description, setDescription] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [availableItems, setAvailableItems] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [updatedAt, setUpdatedAt] = useState("")
  const [imageURL, setImageURL] = useState("")
  
  const navigate = useNavigate()

  const token = useSelector((state) => {
    console.log(state.users.token);
    return state.users.token
  })
  
  const addProduct = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(category);
    console.log(price);
    console.log(description);
    console.log(manufacturer);
    console.log(availableItems);
    console.log(imageURL);

    console.log(new Date().toJSON());
    setCreatedAt(new Date().toJSON());
    setUpdatedAt(new Date().toJSON());
    console.log(createdAt);
    console.log(updatedAt);

    fetch(PRODUCTS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        name:name,
        category:category,
        price:price,
        description:description,
        manufacturer:manufacturer,
        availableItems:availableItems,
        createdAt:createdAt,
        updatedAt:updatedAt,
        imageURL:imageURL
      }),
      headers: {
        "x-auth-token" : token,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.status + ":" + response.statusText);
      }
      return response.json()
    })
    .then((json) => {
      console.log("Added Product Successfully");
      alert("Product "+name+ " Successfully");
      //localStorage.setItem(email, json.access_token);
      //dispatch(userLogin(email, json.access_token));
      navigate("/products");
    })
    .catch (error => {
      // add an alert here that displays an error message that says wrong username or password
      console.log(error.message)
    })
  };

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12}>
            <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Category" type={'category'} onChange={(event) => setCategory(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Price" type={'price'} onChange={(event) => setPrice(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" type={'description'} onChange={(event) => setDescription(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Manufacturer" type={'manufacturer'} onChange={(event) => setManufacturer(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="AvailableItems" type={'availableItems'} onChange={(event) => setAvailableItems(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Image URL" type={'ImageURL'} onChange={(event) => setImageURL(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={addProduct}> Add Product </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AddProducts;