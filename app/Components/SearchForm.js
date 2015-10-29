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
} = React;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.loading}>
        <Text>搜索</Text>
      </View>
    );
  }
}

export { SearchForm as default };
