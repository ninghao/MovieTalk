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
      token: '',
      user: {}
    }

    this.login();

  }

  componentWillUpdate() {
    if (!this.state.token) {
      AsyncStorage.getItem('token')
        .then((token) => {
          this.setState({
            token: JSON.parse(token).access_token
          });
        })
        .then(() => {
          if (this.state.token) {
            this.getCurrentUser();
          }
        });
    }
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
    fetch('https://api.douban.com/v2/user/~me', {
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          user: responseData
        });
      })
      .then(() => {
        console.log(this.state.user);
      })
      .done();
  }

  redirectToLogin() {
    this.props.navigator.push({
      title: '登录',
      component: Login,
    });
  }

  render() {
    return (
      <View style={[styles.container, styles.loading]}>
        <Text>我的档案</Text>
      </View>
    );
  }
}

export { UserProfile as default };
