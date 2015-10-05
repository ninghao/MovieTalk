/**
 * React Native Course by ninghao.net
 */
'use strict';

import React from 'react-native';
import styles from '../Styles/Main';
import USBoxList from './USBoxList';

let {
  Text,
  View,
  NavigatorIOS,
} = React;

class USBox extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '北美票房',
          component: USBoxList
        }}
        shadowHidden="true"
        barTintColor="darkslateblue"
        titleTextColor="rgba(255, 255, 255, 0.8)"
        tintColor="rgba(255, 255, 255, 0.8)"
        translucent="true"
      />
    );
  }
}

export { USBox as default };
