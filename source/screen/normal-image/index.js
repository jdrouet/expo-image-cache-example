import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import images from './dataset.json';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  image: {
    margin: 20,
    width: 200,
    height: 200,
  },
});

export default class NormalImageScreen extends React.Component {
  static navigationOptions = () => ({ title: 'No cache' });
  
  static propTypes = {};
  static defaultProps = {};

  keyExtractor = (item) => item.id;

  renderItem = ({ item }) => {
    const source = {
      uri: `https://picsum.photos/${item.width}/${item.height}?image=${item.id}`,
    };
    return (
      <Image source={source} style={styles.image} />
    );
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={images}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={styles.root}
      />
    );
  }
}
