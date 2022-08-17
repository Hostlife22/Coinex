import { Route, Routes } from 'react-router-dom';
import { AuthLayout, Layout } from './components';
import { Coin, Home, Login, Register, Revenue, Wallet } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="crypto/:id" element={<Coin />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="auth" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
