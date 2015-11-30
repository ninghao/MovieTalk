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
  PixelRatio,
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
      <View style={[styles.container, {
        flexDirection: 'column',
        paddingTop: 160,
      }]}>
        <View style={{
          flex: 1,
          alignSelf: 'center',
        }}>
          <Image
            source={{uri: this.state.user.large_avatar}}
            style={{
              width: 90,
              height: 90,
              borderRadius: 90 / PixelRatio.get(),
            }}
          />

          <Text style={{
            marginVertical: 15,
            fontSize: 18,
            textAlign: 'center',
          }}>{this.state.user.name}</Text>

          <Text style={{
            color: 'rgba(0, 0, 0, 0.6)',
            marginBottom: 10,
            textAlign: 'center',
          }}>{this.state.user.desc}</Text>
        </View>
      </View>
    );
  }
}

export { UserProfile as default };
