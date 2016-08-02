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
  WebView,
  AsyncStorage,
} from 'react-native';

import styles from '../Styles/Main';

class Login extends Component {
  constructor(props) {
    super(props);

    this.api = {
      key: '05b2e24806124f0f1118a6d81236ed2d',
      secret: '132f022db4330578',
    }

    this.oAuth = {
      authBaseUrl: 'https://www.douban.com/service/auth2/auth',
      tokenBaseUrl: 'https://www.douban.com/service/auth2/token',
      redirectUri: 'http://ninghao.net',
      responseType: 'code',
      grantType: 'authorization_code',
      scope: 'douban_basic_common,movie_basic,movie_basic_r,movie_basic_w',
    }

    this.state = {
      authCode: '',
    }

    this.authUrl = `${this.oAuth.authBaseUrl}
      ?client_id=${this.api.key}
      &redirect_uri=${this.oAuth.redirectUri}
      &response_type=${this.oAuth.responseType}
      &scope=${this.oAuth.scope}`.replace(/(\r\n|\n|\r| )/gm, '');
  }

  getToken() {
    let tokenUrl = `${this.oAuth.tokenBaseUrl}
      ?client_id=${this.api.key}
      &client_secret=${this.api.secret}
      &redirect_uri=${this.oAuth.redirectUri}
      &grant_type=${this.oAuth.grantType}
      &code=${this.state.authCode}`.replace(/(\r\n|\n|\r| )/gm, '');

    fetch(tokenUrl, {
      method: 'POST',
      body: `client_id=${this.api.key}`
    })
      .then(response => response.json())
      .then(responseData => {
        AsyncStorage.setItem('token', JSON.stringify(responseData));
      })
      .then(() => this.props.navigator.pop())
      .done();
  }

  async onNavigationStateChange(state) {
    if (state.url.includes('?code=') && state.navigationType === 1) {
      let code = state.url.split('code=')[1];
      await this.setState({
        authCode: code
      });
      console.log(this.state.authCode);

      this.getToken();
    }
  }

  render() {
    return (
      <WebView
        startInLoadingState={true}
        source={{uri: this.authUrl}}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }
}

export { Login as default };
