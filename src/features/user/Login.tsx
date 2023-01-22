import {
  Alert,
  Box,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser, clearApiError } from './userSlice';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { loading, error, userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userInfo && navigate('/');
  }, [navigate, userInfo]);

  useEffect(() => {
    dispatch(clearApiError());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        m={'80px auto'}
        width={isMobile ? '90%' : 500}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h5" mb={2} textAlign="center">
          Login
        </Typography>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 4 }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 4 }}
        />
        <Button variant="contained" fullWidth type="submit" disabled={loading}>
          Submit
        </Button>
      </Box>
      {error && (
        <Alert
          severity="error"
          sx={{ width: isMobile ? '90%' : 500, margin: 'auto' }}
        >
          {error as string}
        </Alert>
      )}
    </>
  );
};

export default Login;
