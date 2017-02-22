'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  NavigatorIOS,
  TextInput,
  AsyncStorage
} from 'react-native';

import styles from '../Styles/Main';
import SearchResult from './SearchResult';
import icons from '../Assets/Icons';


class SearchForm extends Component {
  constructor(props) {
    super(props);

    // AsyncStorage.setItem('name', 'movieTalk')
    //   .then(() => {
    //     AsyncStorage.getItem('name')
    //       .then((value) => console.log(value));
    //   });
    //
    // AsyncStorage.setItem('team', 'ninghao.net')
    //   .then(() => {
    //     AsyncStorage.getItem('team')
    //       .then((value) => console.log(value));
    //   });
    //
    // AsyncStorage.setItem('version', '1.0.0')
    //   .then(() => {
    //     AsyncStorage.getItem('version')
    //       .then((value) => console.log(value));
    //   })
    //   .then(() => {
    //     AsyncStorage.removeItem('version')
    //       .then(() => {
    //         AsyncStorage.getItem('version')
    //           .then((value) => console.log(value));
    //       });
    //   });

    // AsyncStorage.getAllKeys()
    //   .then((keys) => console.log(keys));

    // AsyncStorage.multiRemove(['components', 'lastUpdate'])
    //   .then(() => {
    //     AsyncStorage.getAllKeys()
    //       .then((keys) => console.log(keys));
    //   });

    // AsyncStorage.clear()
    //   .then(() => {
    //     AsyncStorage.getAllKeys()
    //       .then((keys) => console.log(keys));
    //   });

    // AsyncStorage.multiGet(['name', 'team', 'version'])
    //   .then((value) => console.log(value));

    // AsyncStorage.multiSet([
    //   ['lastUpdate', '2015/11/06'],
    //   ['components', 'React Native']
    // ])
    // .then(() => {
    //   AsyncStorage.multiGet([
    //     'name', 'team', 'version', 'lastUpdate', 'components'
    //   ])
    //     .then((value) => console.log(value));
    // });

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      query: '',
      loaded: true,
      opacity: 0,
      searchHistory: [],
    }

    AsyncStorage.getItem('searchHistory')
      .then((searchHistory) => {
        if (searchHistory) {
          this.setState({
            searchHistory: JSON.parse(searchHistory)
          });
        }
      });
  }

  searchHistory() {
    let newSearchHistory =
      [...new Set([this.state.query, ...this.state.searchHistory])];

    this.setState({
      searchHistory: newSearchHistory
    });

    AsyncStorage.setItem(
      'searchHistory', JSON.stringify(newSearchHistory)
    );
  }

  fetchData() {
    this.searchHistory();

    this.setState({
      loaded: false,
      opacity: 1,
    });
    const REQUEST_URL = `https://api.douban.com/v2/movie/search?q=${this.state.query}`
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
            results: responseData,
            query: this.state.query,
          }
        });
      })
      .done();
  }

  async search(item) {
    try {
      await this.setState({
        query: item
      });

      this.fetchData();
    } catch (error) {
      console.log(error);
    }

  }

  deleteSearchHistoryItem(item) {
    let newSearchHistory = new Set(this.state.searchHistory);
    newSearchHistory.delete(item);

    this.setState({
      searchHistory: [...newSearchHistory]
    });

    AsyncStorage.setItem(
      'searchHistory', JSON.stringify([...newSearchHistory])
    );
  }

  renderSearchHistoryList(item) {
    return (
      <TouchableHighlight
        underlayColor="rgba(34, 26, 38, 0.1)"
        onPress={() => this.search(item)}
      >
        <View style={styles.item}>
          <TouchableHighlight
            underlayColor="rgba(34, 26, 38, 0.1)"
            onPress={() => this.deleteSearchHistoryItem(item)}
          >
            <Image
              source={{uri: icons.delete}}
              style={styles.deleteIcon}
             />
          </TouchableHighlight>
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
            value={this.state.query}
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
           <ActivityIndicator
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
           enableEmptySections={true}
         />
      </View>
    );
  }
}

export { SearchForm as default };
