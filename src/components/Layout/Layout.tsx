import { Outlet } from 'react-router-dom';
import { Footer, Header, Sidebar } from '..';
import './Layout.scss';

const Layout = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="home">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
