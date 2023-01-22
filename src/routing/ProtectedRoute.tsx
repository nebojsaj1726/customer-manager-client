import { Button, Grid, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const ProtectedRoute = () => {
  const { userInfo, loading } = useAppSelector((state) => state.user);

  if (!loading && !userInfo) {
    return (
      <Grid container flexDirection="column" alignItems="center">
        <Typography variant="h4" my={5}>
          Customer manager
        </Typography>
        <Button
          component={NavLink}
          to="/login"
          variant="contained"
          sx={{ width: '150px' }}
        >
          Login
        </Button>
      </Grid>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
