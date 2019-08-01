import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/authAction';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { signout } = this.props;
    return (
      <section className="px-3 py-3 ml-2 border-primary-r-lg-1 flex-1 mt-0">
        <nav className="">
          <button type="button" className="button mb-2 toggler" data-toggle="#mynav">
            Menu
          </button>
          <ul className="nav nav-stack" id="mynav">
            <li><NavLink to="/parties">Parties</NavLink></li>
            <li><Link to="office.html">Offices</Link></li>
            <li><Link to="profile.html">My Candidates</Link></li>
            <li><Link to="apply.html">Run for Offices</Link></li>
            <li><Link to="/" onClick={signout}>Logout</Link></li>
          </ul>
        </nav>
      </section>
    );
  }
}

SideBar.propTypes = {
  signout: PropTypes.func.isRequired,
};

export default connect(null, { signout: logout })(SideBar);
