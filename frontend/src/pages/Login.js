import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import validator from 'validator';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BooArt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [category, setCategory] = useState("")
  const [categoryError, setCategoryError] = useState("")

  const validatePassword = (e) => {
    setPassword(e.target.value);

    if (e.target.value.trim().length == 0) {
      setPasswordError("");
    }
    else if (validator.isStrongPassword(e.target.value)) {
      setPasswordError("Strong Password");
    } else {
      setPasswordError(
        "Passwords must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers, and symbols*"
      );
    }
  };

  const validateEmail = (e) => {
    setEmail(e.target.value);

    if (e.target.value.trim().length == 0) {
      setEmailError("");
    }
    else if (validator.isEmail(e.target.value)) {
      setEmailError("Valid Email");
    } else {
      setEmailError("Invalid Email*");
    }
  };

  const handleSelect = (e) => {
    setCategory(e.target.value)
  }

  // console.log(email, password);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      category: data.get('row-radio-buttons-group')
    });
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <span
              className={
                emailError === "Valid Email"
                  ? "text-success text-green-500 text-sm"
                  : "text-danger text-red-500 text-sm"
              }
            >
              {emailError}
            </span>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={validateEmail}
            />
            <span
              className={
                passwordError === "Strong Password"
                  ? "text-success text-green-500 text-sm mb-10"
                  : "text-danger text-red-500 text-sm mb-10"
              }
            >
              {passwordError}
            </span>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={validatePassword}
            />
            <div className='text-center'>
              <FormControl>
                {/* <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel> */}
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={handleSelect}
                >
                  <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
                  <FormControlLabel value="seller" control={<Radio />} label="Seller" />
                </RadioGroup>
              </FormControl>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                emailError === "Valid Email" &&
                  passwordError === "Strong Password" &&
                  category !== ""
                  ? false : true
              }
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to="/#" href="#" variant="body2" className="text-blue-900 text-decoration-line: underline">
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/signup" variant="body2" className="text-blue-900 text-decoration-line: underline">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default Login;
