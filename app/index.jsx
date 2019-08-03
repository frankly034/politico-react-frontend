import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

import LoginPage from './components/pages/Login';
import SignupPage from './components/pages/Signup';
import ForgetPassword from './components/pages/ForgetPassword';

import store from './store';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer transition={Zoom} />
        <Route exact path="/" render={() => (<LoginPage />)} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/password_reset" component={ForgetPassword} />
      </Router>
    </Provider>
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
