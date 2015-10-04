/**
 * React Native Course by ninghao.net
 */
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
} = React;

class MovieDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loading}>
          <Text>MovieDetail</Text>
        </View>
      </View>
    );
  }
}

export { MovieDetail as default };
