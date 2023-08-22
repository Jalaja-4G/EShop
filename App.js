import React from "react";
import {AppBar, Box, Toolbar, Autocomplete} from "@mui/material";
import { Routes, Route, Link} from 'react-router-dom';
import SignUp from "./SignUp";
import Products from "./Products";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductDetails from "./ProductDetails";
import LoginPage from "./LoginPage";
import ModifyProducts from "./ModifyProducts";
import { useDispatch, useSelector } from "react-redux";
import Orders from "./Orders";
import DeleteProducts from "./DeleteProducts"; 
import AddProducts from "./AddProducts";
import { useState, useEffect } from "react";
import { fetchdata } from "./FetchData";
import { TextField } from "@mui/material";
import Categories from "./Categories";
import { Homepage } from "./Homepage";
import { processSearchInput } from "./ProductReducer";
import LogOut from "./LogOut";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white'
};

function App() {
  const [list, setList] = useState([]);
  const dispatch = useDispatch()

  const isUserLoggedIn = useSelector((state) => {
    return state.users.isLoggedIn
  });

  const isAdmin = useSelector((state) => {
    return state.users.isAdmin
  });

  useEffect(() => {
    fetchdata()
      .then(res => {
        setList(res)
      });
  }, []);

  const handleInput = (_event, newValue) => {
    console.log("In handleInput: " + newValue);
    if (newValue != null) {
      console.log("Dispatching processSearchInput")
      dispatch(processSearchInput(newValue.toLowerCase()))
    }
  }; 

  function DisplayRoute({to, title, show}) {
    if (show) {
      return <Link to={to} style={linkStyle}> {title} </Link>
    }
  }

  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"#3f51b5"}}>
        <Toolbar>
          {/* sx = {flexGrow: 1} allows us to set all content at right except typography */}
          <ShoppingCartIcon />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={list.map(item => item.name)}
            style={{ backgroundColor: 'white', width: 350, marginRight: '500px' }}
            onInputChange={handleInput}
            renderInput={(params) => <TextField {...params}
              label="Search title"
              variant="filled"
              sx={{
                width: 350,
                marginRight: '500px',
              }} />} />
          <DisplayRoute to="/users" title="Sign Up" show={!isUserLoggedIn} />
          <DisplayRoute to="/auth" title="Sign In" show={!isUserLoggedIn} />
          <DisplayRoute to="/products/add" title="Add Products" show={isAdmin} />
          <DisplayRoute to="/loggedout" title="Log Out" show={isUserLoggedIn} />
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route name="login" path="/auth" element={<LoginPage />} />
        <Route name="signup" path="/users" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProducts />} />
        <Route path="/product/" element={<ProductDetails />} />
        <Route path="/product/edit" element={<ModifyProducts />} />
        <Route path="/product/delete" element={<DeleteProducts />} />
        <Route path="/orders/" element={<Orders />} />
        <Route path="/addresses/" element={<Orders />} />
        <Route path="/categories/" element={<Categories />} />
        <Route path="/loggedout/" element={<LogOut />} />
      </Routes>
     </Box>
  );
}
export default App;
