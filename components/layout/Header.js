import React from 'react';
import Link from 'next/link';
import Lottie from 'react-lottie';

import animationData from '../../public/logo';

const Header = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return(
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <Lottie options={defaultOptions} height={75} width={75} />
          <span className="logo">CheckYourRecipe</span>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" href="/">Home</Link>
            <Link className="nav-link" href="/">Recipes</Link>
            <Link className="nav-link" href="/">More coming soon</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;