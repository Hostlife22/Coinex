import { Route, Routes } from 'react-router-dom';
import { AuthLayout, Layout } from './components';
import { Home, Login, Profile, Register, Revenue } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="revenue" element={<Revenue />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="auth" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
