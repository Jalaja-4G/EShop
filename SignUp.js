import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_REGISTRATION_ENDPOINT } from './api-endpoints';

import {
    Grid,
    TextField,
    Paper,
    Button
  } from "@mui/material";


const SignUp = () => {
  const [role, setRole] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [contactnumber, setContactNumber] = useState("")
  
  const navigate = useNavigate()
  
  const doSignUp = (e) => {
    e.preventDefault();
   /* console.log(role);
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(password);
    console.log(contactnumber);*/

    
    fetch(USER_REGISTRATION_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        firstName:firstname,
        lastName:lastname,
        email: email,
        password: password,
        contactNumber:contactnumber
      }),
      headers: {
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
      console.log("User registered successfully");
      //localStorage.setItem(email, json.access_token);
      //dispatch(userLogin(email, json.access_token));
      navigate("/auth");
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
            <TextField label="Role" value={role} onChange={(event) => setRole(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="First Name" type={'firstname'} onChange={(event) => setFirstName(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Last Name" type={'lastname'} onChange={(event) => setLastName(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" type={'email'} onChange={(event) => setEmail(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} onChange={(event) => setPassword(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Contact Number" type={'contactnumber'} onChange={(event) => setContactNumber(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={doSignUp}> Sign Up </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SignUp;