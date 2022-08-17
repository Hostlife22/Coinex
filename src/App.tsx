import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthLayout, Layout, ProtectedRoute } from './components';
import { Crypto, Home, Login, Register, Revenue, Wallet } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="revenue" element={<Revenue />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="crypto/:id" element={<Crypto />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="auth" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
