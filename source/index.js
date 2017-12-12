import React from 'react';
import { Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Provider } from 'react-redux';

import { actions as StatusAction } from './reducer/status';
import StackNavigation from './navigator';

import store from './store';

export default class Application extends React.Component {
  componentWillMount() {
    store.dispatch(StatusAction.start());
  }

  render() {
    return (
      <Provider store={store}>
        <StackNavigation />
      </Provider>
    );
  }
}
