import React from 'react'
import Button from '@mui/material/Button'
import { withStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
const styles = {
  root: {
    marginLeft: 5
  }
}
const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    className={props.classes.spinner}
    size={20}
  />
))
const LoginButton = (props) => {
  const {
    children,
    loading,
    ...rest
  } = props
  return (
    <Button {...rest}>
      {children}
      {loading && <SpinnerAdornment {...rest} />}
    </Button>
  )
}

export default LoginButton;