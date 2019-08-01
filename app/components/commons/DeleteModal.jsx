import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const Modal = ({
  name,
  active,
  onCancel,
  onDelete,
  state,
}) => (
  <Fragment>
    <div className={`modal-overlay ${active ? 'd-block' : null}`} id="modal_overlay" />
    <section className={`modal flex flex-center ${active ? 'd-block' : null}`} id="modalDelete">
      <form className="mr-3 bg-light-theme">
        <h3 className="face-300 font-md page-title">Delete Party</h3>
        <p className="font-md face-300 dark my-3">
          { `Are you sure you want to DELETE ${name}?` }
        </p>
        <div>
          <button type="button" className="button button-primary" onClick={onDelete}>
            {
              state
                ? <Loader type="ThreeDots" color="#2C3E50" height={7} width={40} /> : 'Delete'
            }
          </button>
          <button type="button" className="button button-danger-outline ml-1" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </section>
  </Fragment>
);

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  state: PropTypes.bool.isRequired,
};

export default Modal;
