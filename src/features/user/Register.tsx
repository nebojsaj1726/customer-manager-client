import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { clearApiError, registerUser } from './userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { loading, error, success } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  useEffect(() => {
    if (success) navigate('/login');
  }, [navigate, success]);

  useEffect(() => {
    dispatch(clearApiError());
  }, [dispatch]);

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
          Register
        </Typography>
        <TextField
          id="firstName"
          name="firstName"
          label="First name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          sx={{ mb: 4 }}
        />
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

export default Register;
