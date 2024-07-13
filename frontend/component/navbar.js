//#region imports
import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from 'react-redux';
import { logout } from '@/reducers/users';
//#endregion

export default function Navbar() {
  
  const dispatch = useDispatch();
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h6" noWrap>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-3m_7lPQslKN29LuAKCtRznIPeWmqSrq1Dg&s"
            alt="Logo"
            style={{ width: '50%', height: '50%', marginBottom: '10px' }}
          />
        </Typography>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider />
      <List sx={{ marginTop: 'auto' }}>
        <ListItem button onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </Drawer>
  );
};
