/**
 * React Native Course by ninghao.net
 */
'use strict';

import React from 'react-native';
import styles from './app/Styles/Main';
import MovieList from './app/Components/MovieList';

let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} = React;

const REQUEST_URL = 'https://api.douban.com/v2/movie/top250';

class MovieTalk extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MovieList />
    );
  }
}

AppRegistry.registerComponent('MovieTalk', () => MovieTalk);


























// earth
