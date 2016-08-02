'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  NavigatorIOS,
  AsyncStorage,
  PixelRatio,
} from 'react-native';

import styles from '../Styles/Main';
import Login from './Login';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      user: {},
      loaded: false,
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
          user: responseData,
          loaded: true,
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

  logout() {
    AsyncStorage.removeItem('token')
      .then(() => {
        this.setState({
          token: '',
          user: {},
          loaded: false,
        });
      })
      .then(() => {
        this.login();
      });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicator
              size="large"
              color="#6435c9"
            />
          </View>
        </View>
      );
    } else {
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

          <TouchableHighlight
            underlayColor="rgba(34, 26, 38, 0.1)"
            onPress={() => this.logout()}
            style={{
              margin: 10,
              justifyContent: 'flex-end',
              marginBottom: 90,
            }}
          >
            <View style={{
              backgroundColor: '#9182E6',
              borderRadius: 3,
              padding: 13,
            }}>
              <Text style={{
                alignSelf: 'center',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>退出登录</Text>
            </View>
          </TouchableHighlight>

        </View>
      );
    }
  }
}

export { UserProfile as default };
