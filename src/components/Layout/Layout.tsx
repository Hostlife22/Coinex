import { Outlet } from 'react-router-dom';
import { Footer, Header } from '..';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
