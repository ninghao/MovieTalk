/**
 * React Native Course by ninghao.net
 */
'use strict';

import React from 'react-native';
import styles from './app/Styles/Main';

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

    this.state = {
      movies: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };

    this.fetchData();

  }

  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          movies: this.state.movies.cloneWithRows(responseData.subjects),
          loaded: true
        });
      })
      .done();
  }

  renderMovieList(movie) {
    return (
      <View style={styles.item}>
        <View style={styles.itemImage}>
          <Image
            source={{uri: movie.images.large}}
            style={styles.image}
           />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemHeader}>{movie.title}</Text>
          <Text style={styles.itemMeta}>
            {movie.original_title} ( {movie.year} )
          </Text>
          <Text style={styles.redText}>
            {movie.rating.average}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <View style={styles.loading}>
            <Text>加载中...</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.movies}
          renderRow={this.renderMovieList}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('MovieTalk', () => MovieTalk);


























// earth
