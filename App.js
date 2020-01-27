import React, {Component} from 'react';
import {AppConteiner} from './Navigator';
import {configureStore} from './store/store';
import {Provider} from 'react-redux';

export default class App extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <AppConteiner />
      </Provider>
    );
  }
}
