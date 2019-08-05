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
      name: '',
      hqAddress: '',
      party: {},
    };

    this.onDeleteModal = (e) => {
      e.preventDefault();
      this.selectParty(e.target.id, 'deleteModalState');
    };

    this.onEditModal = (e) => {
      e.preventDefault();
      this.selectParty(e.target.id, 'editModalState');
    };

    this.onDelete = async (e) => {
      e.preventDefault();
      const { remove } = this.props;
      const { party } = this.state;
      const res = await remove(party.id);
      if (res.status === 200) {
        notifyToast(`${party.name} successfully deleted.`, { type: 'success' });
      }
      this.setState({
        deleteModalState: false,
        party: {},
      });
    };

    this.onCancel = () => {
      this.setState({
        deleteModalState: false,
        editModalState: false,
        party: {},
      });
    };

    this.onEdit = async (e) => {
      e.preventDefault();
      const { edit } = this.props;
      const { name, hqAddress, party } = this.state;
      const partyData = { name, hqAddress, id: party.id };
      try {
        const res = await edit(partyData);
        if (res.error) {
          this.onCancel();
          return notifyToast(res.error, { type: 'error' });
        }
        this.onCancel();
        return notifyToast('Edited party successfully', { type: 'success' });
      } catch (err) {
        this.onCancel();
        return notifyToast(err.message, { type: 'error' });
      }
    };

    this.onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    this.selectParty = (id, modal) => {
      const { parties } = this.props;
      const selectedParty = parties.filter(party => party.id === Number(id)).shift();
      this.setState({
        [modal]: true,
        party: selectedParty,
        name: selectedParty.name,
        hqAddress: selectedParty.hqAddress,
      });
    };
  }

  async componentDidMount() {
    const { fetch } = this.props;
    await fetch();
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
      party,
      hqAddress,
      name,
    } = this.state;
    return (
      <Fragment>
        <DeleteModal
          active={deleteModalState}
          item={{ ...party }}
          onCancel={this.onCancel}
          onDelete={this.onDelete}
          state={deletingParty}
        />
        <EditModal
          active={editModalState}
          onCancel={this.onCancel}
          onEdit={this.onEdit}
          state={editingParty}
          name={name}
          hqAddress={hqAddress}
          onChange={this.onChange}
          party={party}
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
                    parties.length
                      ? parties.map(
                        currentParty => (
                          <Card
                            id={currentParty.id}
                            title={currentParty.name}
                            text={currentParty.hqAddress}
                            url={currentParty.logoUrl}
                            user={user}
                            key={currentParty.id}
                            onDeleteModal={this.onDeleteModal}
                            onEditModal={this.onEditModal}
                            address={currentParty.hqAddress}
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
  fetch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
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
    fetch: fetchParties,
    remove: deleteParty,
    edit: editParty,
  },
)(withRouter(Parties));
