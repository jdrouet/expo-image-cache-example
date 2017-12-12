import { StackNavigator } from 'react-navigation';

import * as Screen from './screen/stack';

const config = Object
  .keys(Screen)
  .reduce(
    (res, name) =>
      Object.assign(res, { [name]: { screen: Screen[name] } })
    , {},
  );

export default StackNavigator(config, {
  navigationOptions: {},
});
