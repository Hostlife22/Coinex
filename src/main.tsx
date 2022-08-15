import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import './index.css';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}
console.log('Production mode', process.env.NODE_ENV === 'production');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);
