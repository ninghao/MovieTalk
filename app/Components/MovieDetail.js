/**
 * React Native Course by ninghao.net
 */
'use strict';

import React from 'react-native';
import styles from '../Styles/Main';

let {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
} = React;

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetail: ''
    };

    const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${this.props.movie.id}`;

    this.fetchData(REQUEST_URL);
  }

  fetchData(REQUEST_URL) {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          movieDetail: responseData
        });
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loading}>
          <Text>{this.state.movieDetail.summary}</Text>
        </View>
      </View>
    );
  }
}

export { MovieDetail as default };
