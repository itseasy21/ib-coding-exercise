import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import LoginButton from "../components/LoginButton"
import Button from '@mui/material/Button'

import { func } from 'prop-types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import MuiAlert from '@mui/material/Alert';
import { createStyles, makeStyles } from '@mui/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

function LoginBox({processLogin}){
    const classes = useStyles();
    const form = useRef();
    const checkBtn = useRef();
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasError, sethasError] = useState(false);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

      const resetInputs = () => {
          setUsername("");
          setPassword("");
          sethasError(false);
      }

    return (
    <Form className={classes.container} onSubmit={processLogin} ref={form}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Please log in below" />
          <CardContent>
            <div>
              <TextField
                error={hasError}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                value={username}
                onChange={onChangeUsername}
                helperText={hasError ? "The field is required, and valid value is testuser" : ""}
              />
              <TextField
                error={hasError}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                value={password}
                onChange={onChangePassword}
                helperText={hasError ? "The field is required, and valid value is password" : ""}
              />
            </div>
          </CardContent>
          <CardActions>
            <LoginButton
              id="loginButton"
              variant="contained"
              size="large"
              color="primary"
              className={classes.loginBtn}
              onClick={() => processLogin(username, password, setLoading, form, sethasError)}
              loading={loading}
              >
              Login
            </LoginButton>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={resetInputs}
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
      );

}

LoginBox.propTypes = {
    processLogin: func.isRequired
  };

export default LoginBox;
