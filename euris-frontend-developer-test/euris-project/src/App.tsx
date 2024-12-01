import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Header from './components/header/Header';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import SingleStores from './pages/SingleStores';

import './styles/global.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stores/:idStore" element={<SingleStores />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
