import { useRef, useState } from 'react';
import { bool, func } from 'prop-types';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function AppToolbar({ isLoggedIn, onLogin, onLogout }) {
  const userIconRef = useRef(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const classes = useStyles();

  const handleClickUserMenu = () => {
    setUserMenuOpen(true);
  };

  const handleCloseUserMenu = () => {
    setUserMenuOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img
          alt="intelligence bank logo"
          src="/ib-logo.png"
          style={{ width: 48, height: 48, paddingRight: 24 }}
        />
        <Typography variant="h6" className={classes.title}>
          Intelligence Bank Coding Exercise
        </Typography>
        {isLoggedIn ? (
          <>
            <IconButton
              aria-label="user icon"
              aria-controls="user-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClickUserMenu}
              innerRef={userIconRef}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={userIconRef.current}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              aria-label="user menu"
              getContentAnchorEl={null}
              id="user-menu"
              onClose={handleCloseUserMenu}
              open={userMenuOpen}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem aria-label="logout" onClick={onLogout}>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" aria-label="login" onClick={onLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

AppToolbar.propTypes = {
  isLoggedIn: bool.isRequired,
  onLogout: func.isRequired,
  onLogin: func.isRequired,
};

export default AppToolbar;
