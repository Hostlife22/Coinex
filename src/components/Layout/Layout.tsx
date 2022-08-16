import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header, Sidebar } from '..';
import './Layout.scss';

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const handleMenu = () => {
    setOpenSidebar((prev) => !prev);
  };
  return (
    <div className="app">
      <Sidebar isOpen={openSidebar} handleMenu={handleMenu} />
      <main className="wrapper">
        <Header isOpen={openSidebar} handleMenu={handleMenu} />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
