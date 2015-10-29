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
        <View style={{
          paddingTop: 7,
          paddingLeft: 7,
          paddingRight: 7,
          borderColor: "rgba(100, 53, 201, 0.1)",
          borderBottomWidth: 1,
        }}>
          <TextInput
            style={{height: 50}}
            placeholder="搜索 ..."
            clearButtonMode="while-editing"
            returnKeyType="search"
           />
         </View>
      </View>
    );
  }
}

export { SearchForm as default };
