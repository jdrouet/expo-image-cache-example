import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

export default class MainScreen extends React.Component {
  static navigationOptions = () => ({ title: 'Image caching' });

  static propTypes = {};
  static defaultProps = {};

  handlePressNormal = () =>
    this.props.navigation.navigate('NormalImage');

  handlePressForce = () =>
    this.props.navigation.navigate('CachedImage');

  handlePressSmart = () =>
    this.props.navigation.navigate('SmartImage');

  render() {
    return (
      <View style={styles.root}>
        <Button raised large title="Without cache" onPress={this.handlePressNormal} />
        <Button raised large title="With force-cache" onPress={this.handlePressForce} />
        <Button raised large title="With implemented cache" onPress={this.handlePressSmart} />
      </View>
    );
  }
}
