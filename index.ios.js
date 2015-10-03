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
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item systemIcon="featured">
          <MovieList />
        </TabBarIOS.Item>
        <TabBarIOS.Item systemIcon="most-viewed" selected="true">
          <USBox />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('MovieTalk', () => MovieTalk);


























// earth
