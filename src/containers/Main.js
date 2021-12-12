import { bool, func } from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import AppToolbar from '../components/AppToolbar';

import { logout } from "../actions/session";
function Main(props) {
  const dispatch = useDispatch();
  const handleLogin = () => {
    props.history.push('/login');
  };

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <AppToolbar
      isLoggedIn={props.isLoggedIn}
      onLogin={handleLogin}
      onLogout={logOut}
    />
  );
}

Main.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
