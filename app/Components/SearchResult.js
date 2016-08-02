'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';

import MovieDetail from './MovieDetail';
import styles from '../Styles/Main';

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      movies: this.props.results.subjects,
      total: this.props.results.total,
      count: this.props.results.count,
      start: this.props.results.count,
      query: this.props.query,
    }

    this.REQUEST_URL = 'http://api.douban.com/v2/movie/search';
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
      </TouchableHighlight>
    );
  }

  requestURL(
    url = this.REQUEST_URL,
    count = this.state.count,
    start = this.state.start,
    query = this.state.query
  ) {
    return (
      `${url}?q=${query}&count=${count}&start=${start}`
    );
  }

  loadMore() {
    fetch(this.requestURL())
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        let newStart = responseData.start + responseData.count;
        this.setState({
          movies: [...this.state.movies, ...responseData.subjects],
          start: newStart
        });
      })
      .done();
  }

  onEndReached() {
    console.log(
      `到底了！开始：${this.state.start}，总共：${this.state.total}`
    );

    if (this.state.total > this.state.start) {
      this.loadMore();
    }
  }

  renderFooter() {
    if (this.state.total > this.state.start) {
      return (
        <View
          style={{
            marginVertical: 20,
            paddingBottom: 50,
            alignSelf: 'center'
          }}
        >
          <ActivityIndicator />
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

export { SearchResult as default };
