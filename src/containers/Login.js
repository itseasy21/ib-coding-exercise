import React, { useState, useEffect, useRef } from 'react';
import { bool, func } from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"

import { createStyles, makeStyles, Theme } from '@mui/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { SESSION_ACTIONS } from '../actions/types';
import { login, logout } from "../actions/session";
import AppToolbar from '../components/AppToolbar';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: '0 auto',
    },
    loginBtn: {
      marginTop: '2px',
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: '10px',
    }
  })
);

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

function Login(props) {

  const classes = useStyles();

  const handleLogin = () => {
    props.history.push('/login');
  };

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const processLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    // if (checkBtn.context._errors.length === 0) {
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
    }
  };

  const logOut = () => {
    dispatch(logout());
  };

  if (props.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
      <>
    <AppToolbar
      isLoggedIn={props.isLoggedIn}
      onLogin={handleLogin}
      onLogout={logOut}
    />
     <Form className={classes.container} onSubmit={processLogin} ref={form}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Please log in below" />
        <CardContent>
          <div>
            <TextField
            //   error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
            <TextField
            //   error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.loginBtn}
            onClick={processLogin}
            >
            Login
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            // onClick={handleLogin}
            >
            Reset
          </Button>
          <CheckButton
        style={{ display: "none" }}
        ref={checkBtn}
      />
        </CardActions>
      </Card>
    </Form>
    </>
  );
}

Login.propTypes = {
  isLoggedIn: bool.isRequired,
  logout: func.isRequired,
  push: func.isRequired
};


const mapStateToProps = state => {
  return {
    isLoggedIn: state.getIn(['default', 'session']).isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    push: path => dispatch(push(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);