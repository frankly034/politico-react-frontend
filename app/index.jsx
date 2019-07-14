import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <h1>Hello World!!!</h1>
    </Provider>
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
