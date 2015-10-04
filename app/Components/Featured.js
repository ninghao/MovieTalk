/**
 * React Native Course by ninghao.net
 */
'use strict';

import React from 'react-native';
import styles from '../Styles/Main';

let {
  Text,
  View,
  NavigatorIOS,
} = React;

class Featured extends React.Component {
  render() {
    return (
      <View style={styles.loading}>
        <Text>Featured</Text>
      </View>
    );
  }
}

export { Featured as default };
