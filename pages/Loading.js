import React, { Fragment } from 'react';
import { Header, Footer } from '../components';

const Loading = () => {
  return(
    <Fragment>
      <Header />
      <div className="w-100 d-flex justify-content-center align-items-center">
        <div className="spinner-grow text-primary" style={{margin: '5rem 0rem'}} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Loading;