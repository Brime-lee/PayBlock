import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './NavLayout.scss';

function UserLayout(props) {
  return (
    <div>
      <Navbar />
      <div className='page-content'>
        <div className='page-content'>
          <div className='page-content-inner'>{props.children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function PageLayout(props) {
  return <UserLayout {...props} />;
}
