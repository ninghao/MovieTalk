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
} = React;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Login />
    );
  }
}

export { UserProfile as default };
