import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from './LoginReducer';
import { LOGIN_ENDPOINT } from './api-endpoints';
import {
    Grid,
    TextField,
    Paper,
    Button
  } from "@mui/material";


const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const doLogin = (e) => {
    e.preventDefault();
    fetch(LOGIN_ENDPOINT, {
    method: "POST",
        body: JSON.stringify({
        email: username,
        password: password
      }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status + ":" + response.statusText);
      }
      return response.headers.get('x-auth-token')
    })
    .then((token) => {
      const details = JSON.parse(atob(token.split(".")[1]));
      console.log(details)
      console.log(details.isAdmin);
      console.log(typeof(details.isAdmin));
      console.log(username + " successfully logged in")
      localStorage.setItem(username, token);
      //console.log(isAdmin);
      dispatch(userLogin(username, token, details.isAdmin));
      navigate("/products");
    })
    .catch (error => {
      // add an alert here that displays an error message that says wrong username or password
      alert("Please enter correct username or password");
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
            <TextField label="Username" value={username} onChange={(event) => setUsername(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} onChange={(event) => setPassword(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={doLogin}> Login </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LoginPage;