import React, { useState, useEffect } from 'react';
import { bool, func, string } from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router';

import { login, logout } from "../actions/session";
import AppToolbar from '../components/AppToolbar';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import LoginBox from "../components/LoginBox"

function Login(props) {
  const dispatch = useDispatch();
  const [showSnack, setshowSnack] = useState(false);
  const { message, isLoggedIn } = props;

  useEffect(() => {
    if(message) setshowSnack(true);
  }, [message])

  const handleLogin = () => {
    props.history.push('/login');
  };

  const processLogin = (username, password, setLoading, form, sethasError) => {

    setLoading(true);

    form.current.validateAll();
    
    if(username && password){
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      sethasError(true);
    }
  };

  const logOut = () => {
    dispatch(logout());
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

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
    <LoginBox processLogin={processLogin}/>
      {message ? (<Snackbar open={showSnack} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>) : undefined}
  </>
  );
}

Login.propTypes = {
  isLoggedIn: bool.isRequired,
  push: func.isRequired,
  message: string,
};


const mapStateToProps = state => {
  return {
    isLoggedIn: state.getIn(['default', 'session']).isLoggedIn,
    message: state.getIn(['default', 'message']).message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    push: path => dispatch(push(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
