'use strict';

import React from 'react-native';
import styles from '../Styles/Main';
import Login from './Login';

let {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
  NavigatorIOS,
  AsyncStorage,
} = React;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    }

    this.login();
  }

  login() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          this.setState({
            token: JSON.parse(token).access_token
          });
        }
      })
      .then(() => {
        if (this.state.token) {
          this.getCurrentUser();
        }
      })
      .then(() => {
        if (!this.state.token) {
          this.redirectToLogin();
        }
      });
  }

  getCurrentUser() {

  }

  redirectToLogin() {
    
  }

  render() {
    return (
      <Login />
    );
  }
}

export { UserProfile as default };
