import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

import SigninText from '../commons/SigninText';
import IndexHeader from '../commons/IndexHeader';
import Footer from '../commons/Footer';
import { login } from '../../actions/authAction';
import notifyToast from '../../helpers/utils';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    this.onSubmit = async (e) => {
      e.preventDefault();
      const { email, password } = this.state;
      const { signin, history } = this.props;
      try {
        const res = await signin({
          email,
          password,
        });
        if (res.error) {
          return notifyToast(res.error, { type: 'error' });
        }
        const path = res.status === 200 && res.data.data.user.isAdmin ? '/admin' : '/user';
        return history.push(path);
      } catch (err) {
        return notifyToast(err, { type: 'error' });
      }
    };
  }

  render() {
    const { loginIn } = this.props;
    return (
      <Fragment>
        <div className="flex-col wrapper">
          <IndexHeader />
          <main className=" mt-5 pt-5 flex-1">
            <div className="flex-row-reverse flex-center">
              <section className="px-3 py-3 border-primary-r-lg-1">
                <form onSubmit={this.onSubmit}>
                  <div>
                    <input
                      name="email"
                      placeholder="Email"
                      onChange={this.onChange}
                      className="form-item pl-0"
                    />
                  </div>
                  <div>
                    <input
                      name="password"
                      placeholder="Password"
                      onChange={this.onChange}
                      className="form-item pl-0"
                      type="password"
                    />
                  </div>
                  <div>
                    <button type="submit" className="button button-primary">
                      {
                        loginIn
                          ? <Loader type="ThreeDots" color="#2C3E50" height={7} width={40} /> : 'Login'
                      }
                    </button>
                  </div>
                </form>
                <p className="pt-2">
                  {'Do not have an account? '}
                  <Link to="/signup" className="primary">Signup</Link>
                </p>
                <p><Link to="/password_reset" className="primary">Forgot Password?</Link></p>
              </section>
              <section className="px-3 py-3">
                <SigninText />
              </section>
            </div>
          </main>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

Login.propTypes = {
  signin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.object,
    createHref: PropTypes.func,
  }).isRequired,
  loginIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginIn: state.auth.loginIn,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { signin: login })(withRouter(Login));
