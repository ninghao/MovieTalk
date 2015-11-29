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
  }

  onNavigationStateChange(state) {
    console.log(state);
  }

  render() {
    return (
      <WebView
        startInLoadingState={true}
        url="http://ninghao.net"
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }
}

export { Login as default };
