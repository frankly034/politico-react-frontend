import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const IndexHeader = () => (
  <Fragment>
    <header className="flex-row flex-center mt-3 mb-4">
      <h1 className="font-xl face-300 px-1 text-center"><Link to="/">Politico</Link></h1>
    </header>
  </Fragment>
);

export default IndexHeader;
