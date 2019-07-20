import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const SigninText = () => (
  <Fragment>
    <h2 className="face-300 font-lg primary">
      One Citizen,
      <br />
      One Vote!
    </h2>
    <p className="py-4 font-md face-100">
      Want credible, transparent
      <br />
      and accountable elections?
    </p>
    <p className="py-4 font-md">
      <Link to="/signup" className="danger">Join today!</Link>
    </p>
  </Fragment>
);

export default SigninText;
