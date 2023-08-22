import {Box,AppBar,Toolbar,Typography} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {BrowserRouter, Link} from 'react-router-dom';

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'white'
  };

  
function Homepagenavbar() {
    return (
      <Box>
         <AppBar position="static">
            <Toolbar>
               {/* sx = {flexGrow: 1} allows us to set all content at right except typography */}
               <Typography variant = "h4" sx = {{ flexGrow: 1 }}>
                  <ShoppingCartIcon/>
               </Typography>
               <button style={linkStyle}>Sign In</button>
               <button style={linkStyle}>Sign Up</button>
            </Toolbar>
         </AppBar>
      </Box>
    )
  };

