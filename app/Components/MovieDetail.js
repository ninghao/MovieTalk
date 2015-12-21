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
      movieDetail: '',
      loaded: false,
    };

    const REQUEST_URL = `http://web-stack.drupal-8.ninghao.local/node/${this.props.movie.nid}?_format=hal_json`;

    this.fetchData(REQUEST_URL);
  }

  fetchData(REQUEST_URL) {
    fetch(REQUEST_URL, {
      headers: {
        'Accept': 'application/hal+json'
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          movieDetail: responseData,
          loaded: true,
        });
      })
      .done();
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

    let movie = this.state.movieDetail;
    let summary = movie.body[0].value.split(/\r\n\r\n/).map(p => {
      return (
        <View style={{marginBottom: 15, paddingLeft: 6, paddingRight: 6}}>
          <Text style={styles.itemText}>{p}</Text>
        </View>
      );
    });

    return (
      <View style={[styles.container, {paddingTop: 70}]}>
        <View style={[styles.item, {flexDirection: 'column'}]}>
          {summary}
        </View>
      </View>
    );
  }
}

export { MovieDetail as default };
