import { Grid, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const Home = () => {
  const { userInfo } = useAppSelector((state) => state.user);

  return (
    <Grid container flexDirection="column" alignItems="center">
      <Typography variant="h4" my={5}>
        Welcome {userInfo?.firstName}
      </Typography>
      <Button
        component={NavLink}
        to="/customers"
        variant="contained"
        sx={{ width: '200px' }}
      >
        Customers
      </Button>
    </Grid>
  );
};

export default Home;
