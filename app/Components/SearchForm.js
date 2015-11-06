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

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      query: '',
      loaded: true,
      opacity: 0,
      searchHistory: ['fargo', 'matrix', 'hangover'],
    }
  }

  fetchData() {
    this.setState({
      loaded: false,
      opacity: 1,
    });
    const REQUEST_URL = `http://api.douban.com/v2/movie/search?q=${this.state.query}`
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          loaded: true,
          opacity: 0,
        });
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

  renderSearchHistoryList(item) {
    return (
      <TouchableHighlight
        underlayColor="rgba(34, 26, 38, 0.1)"
        onPress={() => {}}
      >
        <View style={styles.item}>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{item}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
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
           <ActivityIndicatorIOS
             size="small"
             color="#6435c9"
             animating={!this.state.loaded}
             style={{
               position: 'absolute',
               right: 10,
               top: 20,
               opacity: this.state.opacity
             }}
           />
         </View>

         <Text style={styles.searchHeader}>搜索历史</Text>
         <ListView
           dataSource={this.dataSource.cloneWithRows(
             this.state.searchHistory
           )}
           renderRow={this.renderSearchHistoryList.bind(this)}
         />
      </View>
    );
  }
}

export { SearchForm as default };
