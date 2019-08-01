import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import { fetchParties, deleteParty, editParty } from '../../actions/partyAction';
import notifyToast from '../../helpers/utils';
import Header from '../commons/Header';
import Footer from '../commons/Footer';
import SideBar from '../commons/SideBar';
import Card from '../commons/Card';
import DeleteModal from '../commons/DeleteModal';
import EditModal from '../commons/EditModal';

class Parties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalState: false,
      editModalState: false,
      selectedParty: '',
      selectedPartyId: 0,
      selectedHqAddress: '',
      party: {},
    };

    this.onDeleteModal = (e) => {
      e.preventDefault();
      this.setState({
        deleteModalState: true,
        selectedParty: e.target.name,
        selectedPartyId: Number(e.target.id),
      });
    };

    this.onEditModal = (e) => {
      e.preventDefault();
      const { parties } = this.props;
      const selectedParty = parties.filter(party => party.id !== e.target.id).shift();
      this.setState({
        editModalState: true,
        selectedParty: e.target.name,
        party: selectedParty,
      });
    };

    this.onDelete = async (e) => {
      e.preventDefault();
      const { deleteParty } = this.props;
      const { selectedPartyId, selectedParty } = this.state;
      const res = await deleteParty(selectedPartyId);
      if (res.status === 200) {
        notifyToast(`${selectedParty} successfully deleted.`, { type: 'success' });
      }
      this.setState({
        deleteModalState: false,
        selectedParty: '',
      });
    };

    this.onCancel = (e) => {
      e.preventDefault();
      this.setState({
        deleteModalState: false,
        editModalState: false,
        selectedParty: '',
      });
    };

    this.onEdit = async (e) => {
      e.preventDefault();
      const { editParty } = this.props;
      const { name, hqAddress, party } = this.state;
      const partyData = { name, hqAddress, party };
      try {
        const res = await editParty(partyData);
        if (res.error) {
          return notifyToast(res.error, { type: 'error' });
        }
        return notifyToast('Edited party successfully', { type: 'success' });
      } catch (err) {
        return notifyToast(err.message, { type: 'error' });
      }
    };

    this.onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
  }

  async componentWillMount() {
    const { fetchParties, parties, fetchingParties } = this.props;
    await fetchParties();
    if (parties.length === 0 && fetchingParties === false) {
      notifyToast('No parties to show at the moment', { type: 'info' });
    }
    return false;
  }

  render() {
    const {
      parties,
      user,
      fetchingParties,
      deletingParty,
      editingParty,
    } = this.props;
    const {
      deleteModalState,
      editModalState,
      selectedParty,
      selectedPartyId,
      party,
    } = this.state;
    return (
      <Fragment>
        <DeleteModal
          active={deleteModalState}
          name={selectedParty}
          onCancel={this.onCancel}
          onDelete={this.onDelete}
          id={selectedPartyId}
          state={deletingParty}
        />
        <EditModal
          active={editModalState}
          onCancel={this.onCancel}
          onEdit={this.onEdit}
          state={editingParty}
          party={party}
          onChange={this.onChange}
        />
        <div className="flex-col wrapper">
          <Header user={user} />
          <main className="flex-1 mt-6">
            <div className="flex-row">
              <SideBar />
              <section className="px-3 py-3 flex-4 ">
                <header className="flex-row-sm">
                  <h1 className="page-title mb-5 flex-2 pb-4">Political Parties</h1>
                  { user.isAdmin === true ? (
                    <span className="flex-1 text-center">
                      <Link className="button button-primary" to="/parties/create">Create Party</Link>
                    </span>
                  )
                    : null
                  }
                </header>
                <section className=" card-group-row-2">
                  {
                    fetchingParties
                      && <Loader type="ThreeDots" color="#2C3E50" height={80} width={80} />
                  }
                  {
                    parties.length ? parties.map(
                      party => (
                        <Card
                          id={party.id}
                          title={party.name}
                          text={party.hqAddress}
                          url={party.logoUrl}
                          user={user}
                          key={party.id}
                          onDeleteModal={this.onDeleteModal}
                          onEditModal={this.onEditModal}
                          address={party.hqAddress}
                        />
                      ),
                    )
                      : null
                  }
                </section>
              </section>
            </div>
          </main>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

Parties.propTypes = {
  fetchParties: PropTypes.func.isRequired,
  deleteParty: PropTypes.func.isRequired,
  editParty: PropTypes.func.isRequired,
  fetchingParties: PropTypes.bool.isRequired,
  deletingParty: PropTypes.bool.isRequired,
  editingParty: PropTypes.bool.isRequired,
  parties: PropTypes.array.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    passportUrl: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  fetchingParties: state.party.fetchingParties,
  parties: state.party.parties,
  deletingParty: state.party.deletingParty,
  editingParty: state.party.editingParty,
  errors: state.party.errors,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {
    fetchParties,
    deleteParty,
    editParty,
  },
)(withRouter(Parties));
