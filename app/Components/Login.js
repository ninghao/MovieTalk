'use strict';

import React from 'react-native';
import styles from '../Styles/Main';

let {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
  NavigatorIOS,
  WebView,
} = React;

class Login extends React.Component {
  constructor(props) {
    super(props);

    let api = {
      key: '05b2e24806124f0f1118a6d81236ed2d',
      secret: '132f022db4330578',
    }

    let oAuth = {
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

    this.authUrl = `${oAuth.authBaseUrl}
      ?client_id=${api.key}
      &redirect_uri=${oAuth.redirectUri}
      &response_type=${oAuth.responseType}
      &scope=${oAuth.scope}`.replace(/(\r\n|\n|\r| )/gm, '');
  }

  async onNavigationStateChange(state) {
    if (state.url.includes('?code=') && state.navigationType === 1) {
      let code = state.url.split('code=')[1];
      await this.setState({
        authCode: code
      });
      console.log(this.state.authCode);
    }
  }

  render() {
    return (
      <WebView
        startInLoadingState={true}
        url={this.authUrl}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }
}

export { Login as default };
