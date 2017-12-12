import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { actions as ImageCacheAction } from '../reducer/image-cache';

class SmartImage extends React.Component {
  static propTypes = {
    localUri: PropTypes.string,
    source: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
    }).isRequired,
    imageCacheAction: PropTypes.shape({
      fetch: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    localUri: null,
  };

  componentWillMount() {
    this.props.imageCacheAction.fetch(this.props.source);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.localUri !== nextProps.localUri;
  }

  getSource() {
    if (!this.props.localUri) return require('../../assets/icon.png');
    return { uri: this.props.localUri };
  }

  render() {
    return (
      <Image
        {...this.props}
        source={this.getSource()}
      />
    );
  }
}

export default connect(
  (state, props) => {
    const { loading, loaded } = state.imageCache;
    return {
      loading: loading.includes(props.source.uri),
      localUri: loaded[props.source.uri],
    };
  },
  (dispatch) => ({
    imageCacheAction: bindActionCreators(ImageCacheAction, dispatch)
  }),
)(SmartImage);
