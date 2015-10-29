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
  TextInput,
} = React;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, {paddingTop: 60}]}>
        <TextInput
          style={{height: 50}}
          placeholder="搜索 ..."
         />
      </View>
    );
  }
}

export { SearchForm as default };
