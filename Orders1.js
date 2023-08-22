import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Autocomplete
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchdata } from "./FetchData";
import { Stack } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ADDRESSES_ENDPOINT, USERS_ENDPOINT } from "./api-endpoints";
import { quantity } from "./ProductDetails";
import { fetchusers } from "./FetchUsers";

const steps = ["Step 1", "Step 2", "Step 3"];

const cards={
    float: 'left',
    padding: '20px',
    width:'auto',
    boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)' 
  };

  const cards1={
    float: 'left',
    padding: '20px',
    width:'300px',
    boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)' 
  };
  
  const cardcontainer={
    width: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row', 
    textAlign:'left' ,
  };

  const inputstyling = {
    outline:'none',
    borderTop:'none',
    borderLeft:'none',
    borderRight:'none',
    width:'100%',
  }

  

const Orders = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [searchParams] = useSearchParams(); 
  const productId = searchParams.get("id");
  const [list, setList] = useState([]);
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")  
  const [street, setStreet] = useState("")
  const [contactnumber, setContactnumber] = useState("")
  const [landmark, setLandmark] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [isAddressSaved, setAddressSaved] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState("");

  const navigate = useNavigate()

  const token = useSelector((state) => {
    console.log(state.users.token);
    return state.users.token
  })

  const userId = useSelector((state) => {
    console.log(state.users.userId);
    return state.users.userId
  })



  const handleInputFilter = () => {
    fetch(ADDRESSES_ENDPOINT, {
        method: "GET",
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
       console.log("Got Address Successfully");
       console.log(json.city);
       //localStorage.setItem(email, json.access_token);
       //dispatch(userLogin(email, json.access_token));
       //navigate("/products");
   })
   .catch (error => {
       // add an alert here that displays an error message that says wrong username or password
       console.log(error.message)
   })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    
        fetch(ADDRESSES_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({
            name:name,
            city:city,
            state:state,
            street:street,
            contactNumber:contactnumber,
            landmark:landmark,
            zipCode:zipcode
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
            console.log("Added Address Successfully");
            alert("Added Address Successfully");
            //localStorage.setItem(email, json.access_token);
            //dispatch(userLogin(email, json.access_token));
            //navigate("/products");
        })
        .catch (error => {
            // add an alert here that displays an error message that says wrong username or password
            console.log(error.message)
        })
        
    
    
   // setAddressSaved(true)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    fetchdata()
      .then(res => {
       // console.log(res[productId-1]);
        //console.log(res);
        var ans=res[productId];
        setList(ans);
        console.log(list);
      })
 }, []);

 const filters=['Default','Low To High','High To Low','Nearest'];


  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          {activeStep === 0 && (
            <>
              <Typography variant="h6">Step 1</Typography>
              <Stack spacing={2}
            sx={{
              maxHeight: 500,
              display:'block',
              flexDirection:'row',
              justifyContent:'space-between',
              padding:5,
            }}>  
                 

                      <div style={cardcontainer}>
                        <div style={cards}>
                           <Typography><strong>Quantity:</strong> {quantity}</Typography>
                           <Typography><strong>Desc:</strong> {list.description}</Typography>
                           <Typography><strong>Price:</strong> {list.price}</Typography>
                           <Typography><strong>Discount Percentage:</strong> {list.discountPercentage}</Typography>
                           <Typography><strong>Rating:</strong> {list.rating}</Typography><br></br>
                           <Typography><img src={list.imageURL} alt="No Image Found"/></Typography>
                           
                           
                        </div>
                      </div>
            </Stack>
            </>
          )}
          {activeStep === 1 && (
            <>
              <Typography variant="h6">Step 2</Typography>
              <Stack spacing={2}
                sx={{
                maxHeight: 600,
                display:'block',
                flexDirection:'row',
                justifyContent:'space-between',
                padding:5,
                marginLeft:'100px',
                marginTop:'-50px'
                }}>  
      <div style={cardcontainer}>
            <div style={cards1}>
                <Typography variant="h6" gutterBottom>Shipping Address</Typography>               
                <Typography>House/Apartment Name<br></br><input type="text" style={inputstyling} onChange={(event) => setName(event.target.value)} placeholder='Enter House/Apartment Name' required/></Typography><br></br>
                <Typography>City<br></br><input type="text" style={inputstyling} onChange={(event) => setCity(event.target.value)} placeholder='Enter City' required/></Typography><br></br>
                <Typography>State <br></br><input type="text" style={inputstyling} onChange={(event) => setState(event.target.value)} placeholder='Enter State' required/></Typography><br></br>
                <Typography>Street <br></br><input type="text" style={inputstyling} onChange={(event) => setStreet(event.target.value)} placeholder='Enter Street' required/></Typography><br></br>
                <Typography>Contact Number <br></br><input type="text" style={inputstyling} onChange={(event) => setContactnumber(event.target.value)} placeholder='Enter Contact Number' required/></Typography><br></br>
                <Typography>Landmark<br></br><input type="text" style={inputstyling} onChange={(event) => setLandmark(event.target.value)} placeholder='Enter Landmark' required /></Typography><br></br>
                <Typography>Zip Code <br></br><input type="text" style={inputstyling} onChange={(event) => setZipcode(event.target.value)} placeholder='Enter Zip Code' required/></Typography><br></br>

                <h3>OR</h3>
                <h3>Select Addresses from below</h3>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo1"
                    onInputChange={handleInputFilter}
                    options={filters}
                    renderInput={(params) => <TextField {...params}
                    label="Apply Filters"
                    sx={{
                        width: 200,
                        marginLeft: '50px',
                    }} />} 
                />

                {activeStep === 2 && (
            <>
            <Typography variant="h6">Step 3</Typography>
            <Stack spacing={2}
            sx={{
              maxHeight: 500,
              display:'block',
              flexDirection:'row',
              justifyContent:'space-between',
              padding:5,
            }}>  
                 

                      <div style={cardcontainer}>
                        <div style={cards}>
                           <Typography><strong>Quantity:</strong> {quantity}</Typography>
                           <Typography><strong>Price:</strong> {list.price}</Typography>
                           <Typography><strong>Total Amount to be paid:</strong> {list.price*quantity}</Typography>
                           <Typography><strong>Address</strong> {list.rating}</Typography><br></br>  
                                                 
                        </div>
                      </div>
            </Stack>

              <TextField
                label="Phone"
                name="phone"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          )}        
            </div>
      </div>
      </Stack>
            </>
          )}
          
        </Grid>
        <Grid item xs={12}>
         <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep==steps.length}
          >
                {/*<h1>{activeStep}</h1>
                <h1>{steps.length}</h1>*/}
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
          {activeStep > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBack}
              disabled={activeStep==steps.length}
              sx={{ marginLeft: 8 }}
            >
              {/*  <h1>{activeStep}</h1>
                <h1>{steps.length}</h1>*/}
              Back
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Orders;