import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header, Sidebar } from '..';
import { useGetAllCryptosQuery } from '../../features/crypto/cryptoApiSlice';
import './Layout.scss';

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  useGetAllCryptosQuery();

  const handleMenu = () => {
    setOpenSidebar((prev) => !prev);
  };
  return (
    <div className="app">
      <Sidebar isOpen={openSidebar} handleMenu={handleMenu} />
      <main className="wrapper">
        <Header isOpen={openSidebar} handleMenu={handleMenu} />
        <Outlet />
      </main>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Layout;
