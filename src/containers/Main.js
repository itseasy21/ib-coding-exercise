import { bool, func, string } from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import React, { useState, useEffect } from 'react';
import AppToolbar from '../components/AppToolbar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { logout } from '../actions/session';
function Main(props) {
  const dispatch = useDispatch();
  const { message, isLoggedIn } = props;
  const [showSnack, setshowSnack] = useState(false);

  useEffect(() => {
    if (message) setshowSnack(true);
  }, [message]);

  const handleLogin = () => {
    props.history.push('/login');
  };
  const logOut = () => {
    dispatch(logout());
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setshowSnack(false);
  };

  return (
    <>
      <AppToolbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={logOut}
      />
      {message ? (
        <Snackbar
          open={showSnack}
          autoHideDuration={10000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : undefined}
    </>
  );
}

Main.propTypes = {
  isLoggedIn: bool.isRequired,
  push: func.isRequired,
  message: string,
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.getIn(['default', 'session']).isLoggedIn,
    message: state.getIn(['default', 'message']).message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    push: path => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
