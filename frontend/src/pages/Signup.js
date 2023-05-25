import * as React from 'react';
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
import { useState } from 'react';
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


const Signup = () => {


  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [firstName, setFirstName] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastName, setLastName] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [userType, setuserType] = useState("")


  const validateFirstName = (e) => {

    setFirstName(e.target.value.trim());
    if (e.target.value.trim() == 0) {
      setFirstNameError("Please enter your first name");
    }
    else if (e.target.value.trim().length < 4) {
      setFirstNameError("First name must have atleast 4 characters");
    }
    else {
      setFirstNameError("Valid First Name")
    }
  }

  const validateLastName = (e) => {
    setLastName(e.target.value.trim());

    if (e.target.value.trim().length == 0) {
      setLastNameError("Please enter your last name");
    }
    else if (e.target.value.trim().length < 4) {
      setLastNameError("Last name must have atleast 4 characters");
    }
    else {
      setLastNameError("Valid Last Name")
    }
  }



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
    setuserType(e.target.value)
  }

  // console.log(firstName);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      userType: data.get('row-radio-buttons-group')
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <span
                  className={
                    firstNameError === "Valid First Name"
                      ? "text-success text-green-500 text-sm"
                      : "text-danger text-red-500 text-sm"
                  }
                >
                  {firstNameError}
                </span>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={validateFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <span
                  className={
                    lastNameError === "Valid Last Name"
                      ? "text-success text-green-500 text-sm mb-10"
                      : "text-danger text-red-500 text-sm mb-10"
                  }
                >
                  {lastNameError}
                </span>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={validateLastName}
                />
              </Grid>
              <Grid item xs={12}>
                <span
                  className={
                    emailError === "Valid Email"
                      ? "text-success text-green-500 text-sm mb-10"
                      : "text-danger text-red-500 text-sm mb-10"
                  }
                >
                  {emailError}
                </span>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={validateEmail}
                />
              </Grid>
              <Grid item xs={12}>
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
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={validatePassword}
                />
              </Grid>
              <Grid item xs={12} className='text-center'>
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
              </Grid>

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                firstNameError === "Valid First Name" &&
                  lastNameError === "Valid Last Name" &&
                  emailError === "Valid Email" &&
                  passwordError === "Strong Password" && userType !== ""
                  ? false : true
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" variant="body2" className="text-blue-900 text-decoration-line: underline">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider >
  )
}

export default Signup
