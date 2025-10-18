import React from 'react';
import { Footer, Navbar } from '../components';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div className="base-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
