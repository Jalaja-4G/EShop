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
import { ADDRESSES_ENDPOINT, ORDERS_ENDPOINT } from "./api-endpoints";
import { quantity } from "./ProductDetails";
import { FetchAddresses } from "./FetchAddresses";

const steps = ["Product Details", "Shipping Address", "Preview Order"];

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
  const [addressId, setAddressId] = useState(0)
  const [address, setAddress] = useState("")
  const [savedAddresses, setSavedAddresses] = useState([{}]);

  const navigate = useNavigate()

  const token = useSelector((state) => {
    return state.users.token
  })

  useEffect(() => {
    if (token != null) {
      FetchAddresses(token)
      .then ((response) => {
        console.log(response)
        return response.json()
      })
      .then((json) => {
        console.log("Got Address Successfully");
        console.log(json);
        const addressList = json.map((item) => {
          console.log(item)
          return {id: item._id, address: "House: " + item.name + ", Street: " + item.street + ", City: " + item.city}
        })
        console.log(addressList);
        setSavedAddresses(addressList)
      })
    }
  }, [token])

  const handleSelectedAddress = (_event, newValue) => {
    console.log("In handleSelectedAddress");
    if (newValue == null) {
      setAddress("");
    } else {
      setAddress(newValue);
    }
    console.log(address);
  }

  const handleSaveAddress = () => {
      fetch(ADDRESSES_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          city: city,
          state: state,
          street: street,
          contactNumber: contactnumber,
          landmark: landmark,
          zipCode: zipcode
        }),
        headers: {
          "x-auth-token": token,
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
        console.log(json)
        const address = "House: " + json._doc.name + ", Street: " + json._doc.street + ", City: " + json._doc.city
        setAddressId(json._doc._id)
        setAddress(address)
    })
    .catch (error => {
        // add an alert here that displays an error message that says wrong username or password
        console.log(error.message)
    })
    handleNext()
  }

  const handleNext = () => {
    console.log(activeStep);

    if(activeStep == 2) {
      console.log(address)
      fetch(ORDERS_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          address : addressId,
          product : orderedProduct._id,
          quantity : quantity
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
        console.log("Order Added Successfully");
        alert("Order Placed Successfully!");
        //localStorage.setItem(email, json.access_token);
        //dispatch(userLogin(email, json.access_token));
        navigate("/products");
      })
      .catch (error => {
        // add an alert here that displays an error message that says wrong username or password
        console.log(error.message)
      })
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

  const orderedProduct = useSelector((state) => {
    console.log(state.products.orderedProduct)
    return state.products.orderedProduct
  })

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
                    <Typography><strong>Desc:</strong> {orderedProduct.description}</Typography>
                    <Typography><strong>Price:</strong> {orderedProduct.price}</Typography>
                    <Typography><strong>Category:</strong> {orderedProduct.category}</Typography>
                    <Typography><strong>Manufacturer:</strong> {orderedProduct.manufacturer}</Typography><br></br>
                    <Typography><img style={{ width: "400px", height: "470px" }} src={orderedProduct.imageURL} alt="No Image Found" /></Typography>


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
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleSaveAddress}
                      disabled={activeStep==steps.length}
                      sx={{ marginLeft: "100px" }}
                    >
                      Save
                    </Button>
                    <h3 style={{textAlign:"center"}}>OR</h3>
                    <h3>Select Addresses from below</h3>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo1"
                        onInputChange={handleSelectedAddress}
                        options={savedAddresses}
                        getOptionLabel= {(option) => {
                          setAddressId(option.id)
                          return option.address
                        }}
                        renderInput={(params) => <TextField {...params}
                        label="Select Address"
                        sx={{
                            width: 200,
                            marginLeft: '50px',
                        }} />} 
                    />
                    </div>
                  </div>
                </Stack>
                </>
          )}
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
                            <Typography><strong>Price:</strong> {orderedProduct.price}</Typography>
                            <Typography><strong>Total Amount to be paid:</strong> {orderedProduct.price*quantity}</Typography>
                            <Typography><strong>Address</strong> {address}</Typography><br></br>  
                                                  
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
            sx={{
              marginLeft : '30px',
              marginTop : '160px'
          }}
          >
                {/*<h1>{activeStep}</h1>
                <h1>{steps.length}</h1>*/}
            {activeStep === steps.length - 1 ? "Place Order" : "Next"}
          </Button>
          {activeStep > 0 && ( 
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBack}
              disabled={activeStep==steps.length}
              sx={{ marginTop: '160px', marginLeft:'40px' }}
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