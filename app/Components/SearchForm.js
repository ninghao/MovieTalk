'use strict';

import React from 'react-native';
import styles from '../Styles/Main';
import SearchResult from './SearchResult';

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
    this.state = {
      query: ''
    }
  }

  fetchData() {
    const REQUEST_URL = `http://api.douban.com/v2/movie/search?q=${this.state.query}`
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.props.navigator.push({
          title: responseData.title,
          component: SearchResult,
          passProps: {
            results: responseData.subjects
          }
        });
      })
      .done();
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
            onChangeText={(query) => {
              this.setState({
                query
              });
            }}
            onSubmitEditing={this.fetchData.bind(this)}
           />
         </View>
      </View>
    );
  }
}

export { SearchForm as default };
