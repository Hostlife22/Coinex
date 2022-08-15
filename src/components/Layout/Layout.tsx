import { Outlet } from 'react-router-dom';
import { Footer, Header } from '..';
import './Layout.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
