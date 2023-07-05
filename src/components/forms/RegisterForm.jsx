import {
  Button,
  TextField,
  Typography,
  Avatar,
  Box,
  FormControlLabel,
  Container,
  Checkbox,
  Grid,
  Link
} from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppCircularProgress from "../pure/loadings/AppCircularProgress";

const RegisterForm = () => {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false)
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "", 
    password: "",
    confirm: "",
    is_stocker: false,
    role: 'student'

};

  const registerSchema = yup.object().shape({
    username: yup.string().required("IS NEEDED"),
    email: yup.string().required(),
    password: yup.string().min(6, 'Password too short!').required(),
    confirm: yup.string().when("password", {
      is: (value) => (value && value.length > 0 ? true : false),
      then: () =>
        yup
          .string()
          .oneOf([yup.ref("password")], "Passwords do not match!")
          .required("IS NEEDED"),
    }),
    is_stocker: yup.boolean()
  });
  
  // const handleEmailError = (errors, touched) => {

  //   if(errors.username && touched.username){
  //     return true
  //   } else if (alreadyExist){
  //     return true
  //   }
  //   return false
  // }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={async (values) => {
        setAlreadyExist(false);
        try{
          const res = await fetch('http://localhost:4000/user/signUp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: values.username,
              email: values.email,
              password: values.password, 
              role: values.is_stocker ? 'stocker' : 'student' 
            })
        })
        
        console.log(res.status)
        res.status === 200 && navigate('/login')
        res.status === 403 && setAlreadyExist(true)
      }
        catch(err){

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
        handleSubmit,
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
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                error={errors.username && touched.usrename ? true : false}
                margin="normal"
                required
                fullWidth
                id="username"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Name"
                name="username"
                autoComplete="username"
                type="text"
                autoFocus
              />
              <TextField
                error={errors.email && touched.email ? true : alreadyExist ? true : false}
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
                helperText={alreadyExist && 'Username already exist'}
              />
              <TextField
                error={errors.password && touched.password ? true : false}
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
              <TextField
                error={errors.confirm && touched.confirm}
                margin="normal"
                required
                fullWidth
                name="confirm"
                label="Confirm password"
                type="password"
                id="confirm"
                helperText={errors.confirm && touched.confirm &&(
                    <ErrorMessage name="confirm"></ErrorMessage>
                )}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete=""
              />
              <FormControlLabel
                control={<Checkbox value="true" name="is_stocker" onChange={handleChange}
                onBlur={handleBlur} color="primary" />}
                label="Are you a stocker?"
                
              />
            <AppCircularProgress text={'Sign Up'} loading={loading} setSuccess={setSuccess} setLoading={setLoading} success={success}/>
            {isSubmitting ? setLoading(true) : setLoading(false)}
            </Box>
            <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
          </Box>
        </Container>
      )}
    </Formik>
  );
};

export default RegisterForm;
