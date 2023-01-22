import { useState } from 'react';
import {
  Box,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/user/userSlice';

const styles = {
  link: {
    textDecoration: 'none',
    color: 'gray',
  },
};

const Drawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const logoutAction = () => {
    setOpenDrawer(false);
    dispatch(logout());
  };

  return (
    <>
      <MuiDrawer open={openDrawer} onClose={closeDrawer}>
        <List sx={{ width: 200 }}>
          <ListItem onClick={closeDrawer}>
            <ListItemText>
              <Box component={NavLink} to="/" sx={styles.link}>
                Home
              </Box>
            </ListItemText>
          </ListItem>
          {!userInfo && (
            <ListItem onClick={closeDrawer}>
              <ListItemText>
                <Box component={NavLink} to="/register" sx={styles.link}>
                  Register
                </Box>
              </ListItemText>
            </ListItem>
          )}
          {userInfo ? (
            <ListItem onClick={logoutAction}>
              <ListItemText>
                <Box sx={{ cursor: 'pointer', color: 'gray' }}>Logout</Box>
              </ListItemText>
            </ListItem>
          ) : (
            <ListItem onClick={closeDrawer}>
              <ListItemText>
                <Box component={NavLink} to="/login" sx={styles.link}>
                  Login
                </Box>
              </ListItemText>
            </ListItem>
          )}
        </List>
      </MuiDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{ color: 'white' }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Drawer;
