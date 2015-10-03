/**
 * React Native Course by ninghao.net
 */
'use strict';

import React from 'react-native';
import styles from './app/Styles/Main';
import MovieList from './app/Components/MovieList';
import USBox from './app/Components/USBox';

let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TabBarIOS,
} = React;

const REQUEST_URL = 'https://api.douban.com/v2/movie/top250';

class MovieTalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'us_box'
    };
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="featured"
          selected={this.state.selectedTab === 'featured'}
          onPress={() => {
            this.setState({
              selectedTab: 'featured'
            });
          }}>
          <MovieList />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="most-viewed"
          selected={this.state.selectedTab === 'us_box'}
          onPress={() => {
            this.setState({
              selectedTab: 'us_box'
            });
          }}>
          <USBox />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('MovieTalk', () => MovieTalk);


























// earth
