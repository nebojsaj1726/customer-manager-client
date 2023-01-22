import {
  Box,
  Typography,
  Paper,
  InputBase,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAppDispatch } from '../app/hooks';
import { searchByCompany } from '../features/customers/customersSlice';

const SearchBar = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      company: '',
    },
    onSubmit: (values) => {
      dispatch(searchByCompany(values));
      formik.resetForm();
    },
  });

  return (
    <Box
      display="flex"
      flexDirection={isTablet ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h5">Customers</Typography>
      <Box
        display="flex"
        flexDirection={isTablet ? 'column' : 'row'}
        alignItems="center"
      >
        <Paper
          sx={{
            p: '2px 4px',
            border: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 400,
            height: 40,
          }}
        >
          <InputBase
            placeholder="Search by company..."
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton
            type="button"
            onClick={formik.submitForm}
            sx={{ p: '10px' }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          component={NavLink}
          to="/add-customer"
          variant="contained"
          sx={{
            width: '170px',
            height: '40px',
            fontSize: '10px',
            my: '20px',
            ml: '10px',
          }}
        >
          Create new customer
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
