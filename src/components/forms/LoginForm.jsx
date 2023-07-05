import {
    TextField,
    Typography,
    Avatar,
    Box,
    Container,
    Grid,
    Link
  } from "@mui/material";
  import { ErrorMessage, Formik } from "formik";
  import * as yup from "yup";
  import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../context/contexts/UserContext";
import AppCircularProgress from "../pure/loadings/AppCircularProgress";
  
  const LoginForm = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userFound, setUserFound] = useState(true); 
    const {setLoggedUserId} = useContext(UserContext);
    const initialValues = {
      email: "",
      password: ""
  };
  
    const registerSchema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required()
    });
    
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          try{
            const res = await fetch('http://localhost:4000/user/login', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email: values.email,
                password: values.password
              })
          })
          res.status === 200 && setSuccess(true)
          const data = await res.json();
          if(data === 'User not found'){
            return setUserFound(false)
          }  
          localStorage.setItem('credentials', data.token)
          setLoggedUserId(data.userId);

          navigate('/dashboard', {
            replace: true
          })
        }
          catch(err){
              console.error(err)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <HowToRegIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  error={!userFound}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  autoFocus
                  helperText={!userFound && 'Incorrect user or password '}
                />
                <TextField
                  error={errors.password && touched.password ? true: false}
                  margin="normal"
                  required
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  label="Password"
                  type="password"
                  helperText={errors.password && touched.password &&(
                      <ErrorMessage name="password"></ErrorMessage>
                  )}
                  id="password"
                  autoComplete="current-password"
                />

                    <AppCircularProgress text={'Sign In'} loading={loading} setSuccess={setSuccess} setLoading={setLoading} success={success}/>
                {isSubmitting ? setLoading(true) : setLoading(false)}
              </Box>
              <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
            </Box>
          </Container>
        )}
      </Formik>
    );
  };
  
  export default LoginForm;
  