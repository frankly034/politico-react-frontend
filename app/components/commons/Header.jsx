import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = (props) => {
  const { user: { firstname } } = props;
  return (
    <header className="flex-row-sm top-nav bg-dark-theme">
      <h1 className="flex-2"><Link to="/parties" className="light">Politico</Link></h1>
      <span className="font-300 flex-center flex-align-center flex-row text-right pr-2 mr-5 mt-1">
        <i className="material-icons">account_box</i>
        <span className="pl-1">{firstname}</span>
      </span>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Header;
