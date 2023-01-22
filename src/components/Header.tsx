import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Toolbar,
  AppBar,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserDetails, logout } from '../features/user/userSlice';
import Drawer from './Drawer';

const styles = {
  link: {
    textDecoration: 'none',
    color: 'white',
    marginLeft: '10px',
  },
};

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { userInfo, userToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    userToken && dispatch(getUserDetails());
  }, [userToken, dispatch]);

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          <Drawer />
        ) : (
          <>
            <Typography
              variant="h5"
              sx={{ width: '120px', fontFamily: 'Arial' }}
            >
              CM
            </Typography>
            <Grid container ml={2} alignItems="center">
              <Grid item component={NavLink} to="/" sx={styles.link}>
                Home
              </Grid>
              {!userInfo && (
                <Grid item component={NavLink} to="/register" sx={styles.link}>
                  Register
                </Grid>
              )}
              {userInfo ? (
                <Grid
                  item
                  onClick={() => dispatch(logout())}
                  sx={{
                    marginLeft: '10px',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'yellow',
                    },
                  }}
                >
                  Logout
                </Grid>
              ) : (
                <Grid item component={NavLink} to="/login" sx={styles.link}>
                  Login
                </Grid>
              )}
              {userInfo && (
                <Grid
                  item
                  ml={2}
                  fontSize="14px"
                >{`Logged in as ${userInfo.email}`}</Grid>
              )}
            </Grid>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
