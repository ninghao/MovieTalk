/**
 * React Native Course by ninghao.net
 */
'use strict';

import React from 'react-native';
import styles from '../Styles/Main';
import MovieDetail from './MovieDetail';

let {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
} = React;

class MovieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loaded: false,
      count: 10,
      page: 0,
      noResult: false,
    };

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.REQUEST_URL = 'http://web-stack.drupal-8.ninghao.local/api/movie';

    this.fetchData();

  }

  requestURL(
    url = this.REQUEST_URL,
    page = this.state.page
  ) {
    return (
      `${url}?page=${page}`
    );
  }

  fetchData() {
    fetch(this.requestURL())
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          movies: responseData,
          loaded: true,
          page: this.state.page + 1
        });
      })
      .done();
  }

  showMovieDetail(movie) {
    this.props.navigator.push({
      title: movie.title,
      component: MovieDetail,
      passProps: {movie},
    });
  }

  renderMovieList(movie) {
    return (
      <TouchableHighlight
        underlayColor="rgba(34, 26, 38, 0.1)"
        onPress={() => this.showMovieDetail(movie)}
      >
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image
              source={{uri: movie.field_poster.replace(/(\r\n|\n|\r| )/gm, '')}}
              style={styles.image}
             />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{movie.title}</Text>
            <Text style={styles.itemMeta}>
              {movie.field_name} ( {movie.field_release_date} )
            </Text>
            <Text style={styles.redText}>
              {/*movie.rating.average*/}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  loadMore() {
    fetch(this.requestURL())
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          movies: [...this.state.movies, ...responseData],
          page: this.state.page + 1
        });

        if (responseData.length === 0) {
          this.setState({
            noResult: true
          });
        }
      })
      .done();
  }

  onEndReached() {
    console.log(
      `到底了！开始：${this.state.start}，总共：${this.state.total}`
    );

    this.loadMore();
  }

  renderFooter() {
    if (!this.state.noResult) {
      return (
        <View
          style={{
            marginVertical: 20,
            paddingBottom: 50,
            alignSelf: 'center'
          }}
        >
          <ActivityIndicatorIOS />
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginVertical: 20,
            paddingBottom: 50,
            alignSelf: 'center'
          }}
        >
          <Text
            style={{
              color: 'rgba(0, 0, 0, 0.3)'
            }}
          >没有可以显示的内容了：）</Text>
        </View>
      );
    }
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicatorIOS
              size="large"
              color="#6435c9"
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ListView
          renderFooter={this.renderFooter.bind(this)}
          pageSize={this.state.count}
          onEndReached={this.onEndReached.bind(this)}
          initialListSize={this.state.count}
          dataSource={this.dataSource.cloneWithRows(this.state.movies)}
          renderRow={this.renderMovieList.bind(this)}
        />
      </View>
    );
  }
}

export { MovieList as default };
