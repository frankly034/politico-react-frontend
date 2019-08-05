import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const Modal = ({
  active,
  onCancel,
  onEdit,
  onChange,
  state,
  name,
  hqAddress,
}) => (
  <Fragment>
    <div className={`modal-overlay ${active ? 'd-block' : null}`} id="modal_overlay" />
    <section className={`modal flex flex-center ${active ? 'd-block' : null}`}>
      <form className="mr-3 bg-light-theme">
        <h3 className="face-300 font-md page-title">Edit Party</h3>
        <div>
          <input
            required
            type="text"
            name="name"
            value={name}
            className="form-item"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            required
            type="text"
            name="hqAddress"
            value={hqAddress}
            className="form-item"
            onChange={onChange}
          />
        </div>
        <div>
          <button type="button" className="button button-primary" onClick={onEdit}>
            {
              state
                ? <Loader type="ThreeDots" color="#2C3E50" height={7} width={40} /> : 'Edit Party'
            }
          </button>
          <button type="button" className="button button-danger-outline ml-1" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </section>
  </Fragment>
);

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  hqAddress: PropTypes.string.isRequired,
};

export default Modal;
