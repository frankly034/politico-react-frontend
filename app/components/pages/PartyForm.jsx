import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import { createParty } from '../../actions/partyAction';
import notifyToast from '../../helpers/utils';
import Header from '../commons/Header';
import Footer from '../commons/Footer';
import SideBar from '../commons/SideBar';

class PartyForm extends Component {
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
      const { create, history } = this.props;
      const formData = new FormData(document.querySelector('form'));
      try {
        const res = await create(formData);
        if (res.error) {
          return notifyToast(res.error, { type: 'error' });
        }
        const path = res.status === 200 && res.data.data.user.isAdmin ? '/parties' : '/parties';
        return history.push(path);
      } catch (err) {
        return notifyToast(err.message, { type: 'error' });
      }
    };
  }

  render() {
    const { user, creatingParty } = this.props;
    return (
      <div className="flex-col wrapper">
        <Header user={user} />
        <main className="flex-1 mt-6">
          <div className="flex-row">
            <SideBar />
            <section className="px-3 py-3 flex-4 ">
              <header className="flex-row-sm">
                <h1 className="page-title mb-5 flex-2 pb-4">New Party</h1>
              </header>
              <section className="">
                <form className="form-50" onSubmit={this.onSubmit}>
                  <div>
                    <input required type="text" name="name" placeholder="Party Name" className="form-item" />
                  </div>
                  <div>
                    <input required type="text" name="hqAddress" placeholder="Headquarters Address" className="form-item" />
                  </div>
                  <div>
                    <label htmlFor="logo" className="font-sm">
                      Upload logo
                      <input required type="file" id="logoUrl" name="logoUrl" className="form-item-file" />
                    </label>
                  </div>
                  <div>
                    <button type="submit" className="button button-primary">
                      {
                        creatingParty
                          ? <Loader type="ThreeDots" color="#2C3E50" height={10} width={40} /> : 'Create Party'
                      }
                    </button>
                  </div>
                </form>
              </section>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

PartyForm.propTypes = {
  create: PropTypes.func.isRequired,
  creatingParty: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.object,
    createHref: PropTypes.func,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    passportUrl: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  creatingParty: state.party.creatingParty,
  errors: state.party.errors,
  user: state.auth.user,
});

export default connect(mapStateToProps, { create: createParty })(withRouter(PartyForm));
