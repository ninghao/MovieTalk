/**
 * React Native Course by ninghao.net
 */
'use strict';

import React from 'react-native';

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

let styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    paddingBottom: 6,
    marginBottom: 6,
    flex: 1,
  },
  itemContent: {
    flex: 1,
    marginLeft: 13,
    marginTop: 6,
  },
  itemHeader: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    color: '#6435c9',
    marginBottom: 6,
  },
  itemMeta: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom:6,
  },
  redText: {
    color: '#db2828',
    fontSize: 15,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
  },
  overlayHeader: {
    fontSize: 33,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#eae7ff',
    padding: 10,
  },
  overlaySubHeader: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#eae7ff',
    padding: 10,
    paddingTop: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  image: {
    width: 99,
    height: 138,
    margin: 6,
  },
  itemText: {
    fontSize: 33,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#6435c9',
    padding: 30,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#eae7ff',
    flex: 1,
    paddingTop: 23,
  }
});

AppRegistry.registerComponent('MovieTalk', () => MovieTalk);


























// earth
