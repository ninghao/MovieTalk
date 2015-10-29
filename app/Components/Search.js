'use strict';

import React from 'react-native';
import styles from '../Styles/Main';
import SearchForm from './SearchForm';

let {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
  NavigatorIOS,
} = React;

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '搜索',
          component: SearchForm
        }}
        shadowHidden="true"
        barTintColor="darkslateblue"
        titleTextColor="rgba(255, 255, 255, 0.8)"
        tintColor="rgba(255, 255, 255, 0.8)"
        translucent="true"
      />
    );
  }
}

export { Search as default };
