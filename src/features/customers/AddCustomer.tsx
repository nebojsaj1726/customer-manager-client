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
import { clearApiError } from './customersSlice';
import { createCustomer } from './customersSlice';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required').max(30),
  lastName: Yup.string().required('Last name is required').max(30),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: Yup.string().required('Phone is required').max(30),
  address: Yup.string().required('Address is required').max(40),
  description: Yup.string().max(50),
  company: Yup.string().required('Company is required'),
});

const AddCustomer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { loading, error } = useAppSelector((state) => state.customers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearApiError());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      company: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(createCustomer({ customer: values, navigate }));
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      m={'80px auto'}
      width={isMobile ? '90%' : 500}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <>
        <Typography variant="h5" mb={2} textAlign="center">
          Add customer
        </Typography>
        <TextField
          name="firstName"
          label="First name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          sx={{ mb: 4 }}
        />
        <TextField
          name="lastName"
          label="Last name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          sx={{ mb: 4 }}
        />
        <TextField
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 4 }}
        />
        <TextField
          name="phone"
          label="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          sx={{ mb: 4 }}
        />
        <TextField
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          sx={{ mb: 4 }}
        />
        <TextField
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          sx={{ mb: 4 }}
        />
        <TextField
          name="company"
          label="Company"
          value={formik.values.company}
          onChange={formik.handleChange}
          error={formik.touched.company && Boolean(formik.errors.company)}
          helperText={formik.touched.company && formik.errors.company}
          sx={{ mb: 4 }}
        />
        <Button variant="contained" fullWidth type="submit" disabled={loading}>
          Submit
        </Button>
        {error && (
          <Alert
            severity="error"
            sx={{ width: isMobile ? '90%' : 450, margin: '10px auto' }}
          >
            {error as string}
          </Alert>
        )}
      </>
    </Box>
  );
};

export default AddCustomer;
