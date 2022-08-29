import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header, Sidebar } from '..';
import useMediaQuery from '../../hooks/useMediaQuery';
import './Layout.scss';

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const matches = useMediaQuery('(max-width: 630px)');

  useEffect(() => {
    if (matches) {
      setOpenSidebar(true);
    }
  }, [matches]);

  const handleMenu = () => {
    if (!matches) {
      setOpenSidebar((prev) => !prev);
    }
  };
  return (
    <div className="app">
      <Sidebar isOpen={openSidebar} handleMenu={handleMenu} matches={matches} />
      <main className="wrapper">
        <Header isOpen={openSidebar} handleMenu={handleMenu} />
        <Outlet />
      </main>
      <ToastContainer autoClose={2000} data-testid="toast" />
    </div>
  );
};

export default Layout;
