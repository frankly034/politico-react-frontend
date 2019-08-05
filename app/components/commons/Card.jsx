import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  id,
  title,
  text,
  url,
  user: { isAdmin },
  onDeleteModal,
  onEditModal,
  address,
}) => (
  <div className="card card-light card-row">
    <section className="card-50 card-head">
      <img src={url} alt="Logo" />
    </section>
    <section className="card-50 card-body">
      <h3 className="card-title">{title}</h3>
      <address className="card-text">
        <p>{text}</p>
      </address>
      {
        isAdmin ? (
          <div className="flex-row-sm pr-3">
            <section className="mr-3">
              <button
                className="button showEdit"
                type="button"
                onClick={onEditModal}
                id={id}
              >
                  Edit
              </button>
            </section>
            <section>
              <button
                name={title}
                id={id}
                address={address}
                className="button button-danger showDelete"
                type="button"
                onClick={onDeleteModal}
              >
                Delete
              </button>
            </section>
          </div>
        ) : null
      }
    </section>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
  onEditModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Card;
