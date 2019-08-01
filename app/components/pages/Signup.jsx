import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import IndexHeader from '../commons/IndexHeader';
import Footer from '../commons/Footer';
import { signup } from '../../actions/authAction';
import notifyToast from '../../helpers/utils';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    this.onSubmit = async (e) => {
      e.preventDefault();
      // validate inputs
      const { signUp, history } = this.props;
      const formData = new FormData(document.querySelector('form'));
      try {
        const res = await signUp(formData);
        if (res.error) {
          return notifyToast(res.error, { type: 'error' });
        }
        const path = res.status === 200 && res.data.data.user.isAdmin ? '/parties' : '/parties';
        return history.push(path);
      } catch (err) {
        return notifyToast(err, { type: 'error' });
      }
    };
  }

  render() {
    const { signinUp } = this.props;
    return (
      <Fragment>
        <div className="flex-col wrapper">
          <IndexHeader />
          <main className="flex-1">
            <div className="flex-row-reverse flex-center">
              <section className="px-3 py-3">
                <form onSubmit={this.onSubmit}>
                  <div>
                    <input name="firstname" type="text" placeholder="First Name" onChange={this.onChange} className="form-item pl-0" />
                  </div>
                  <div>
                    <input name="othername" type="text" placeholder="Other Name" onChange={this.onChange} className="form-item pl-0" />
                  </div>
                  <div>
                    <input name="lastname" type="text" placeholder="Last Name" onChange={this.onChange} className="form-item pl-0" />
                  </div>
                  <div>
                    <input name="email" type="email" placeholder="Email" onChange={this.onChange} className="form-item pl-0" />
                  </div>
                  <div>
                    <input name="phoneNumber" type="tel" placeholder="Phone Number" onChange={this.onChange} className="form-item pl-0" />
                  </div>
                  <div>
                    <label htmlFor="passportUrl" className="font-sm">
                      Passport
                      <input id="passportUrl" name="passportUrl" type="file" onChange={this.onChange} className="form-item-file" />
                    </label>
                  </div>
                  <div>
                    <input name="password" type="password" placeholder="Password" onChange={this.onChange} className="form-item pl-0" />
                  </div>
                  <div>
                    <button type="submit" className="button button-primary">
                      {
                        signinUp
                          ? <Loader type="ThreeDots" color="#2C3E50" height={10} width={40} /> : 'Signup'
                      }
                    </button>
                  </div>
                </form>
                <p className="pt-2">
                  {'Have an account? '}
                  <Link to="/" className="primary">Signin</Link>
                </p>
              </section>
            </div>
          </main>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

Signup.propTypes = {
  signUp: PropTypes.func.isRequired,
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.object,
    createHref: PropTypes.func,
  }).isRequired,
  signinUp: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  signinUp: state.auth.signinUp,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { signUp: signup })(withRouter(Signup));
