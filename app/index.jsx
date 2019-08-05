import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

import LoginPage from './components/pages/Login';
import SignupPage from './components/pages/Signup';
import ForgetPassword from './components/pages/ForgetPassword';
import Parties from './components/pages/Parties';
import PartyForm from './components/pages/PartyForm';
import PrivateRoute from './components/HOC/PrivateRoute';

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
        <PrivateRoute exact component={Parties} path="/parties" />
        <PrivateRoute exact component={PartyForm} path="/parties/create" />
      </Router>
    </Provider>
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
