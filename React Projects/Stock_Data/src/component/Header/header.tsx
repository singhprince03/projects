import React from 'react';
import './header.css';

interface Props {
  title: string;
}

// eslint-disable-next-line
export const Header: React.FC<Props> = ({ title }) => {
  return (
    <nav className='navbar bg-secondary' data-testid='header-nav'>
      <div
        className='container-fluid d-flex justify-content-center'
        data-testid='header-div'
      >
        <span className='navbar-brand h1' id='title' data-testid='header-span'>
          {title}
        </span>
      </div>
    </nav>
  );
};
// export default Header;
