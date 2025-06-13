import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AuthModal from './components/elements/AuthModal';
import Home from './components/Home';
import Arbitrage from './components/Arbitrage'
import Futures from './components/Futures'

const App: React.FC = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  return (
    <Router>
      <main className="min-h-screen overflow-x-hidden relative bg-gray-900">
        <div className="relative z-10 max-w-7xl sm:mx-auto px-4 sm:px-6 lg:px-8">
          <Header onLoginClick={() => setAuthModalOpen(true)} />
          {isAuthModalOpen && (
            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setAuthModalOpen(false)}
              onSubmit={(data) => console.log('Submitted', data)}
            />
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/arbitrage' element={<Arbitrage />} />
            <Route path='/futures' element={<Futures />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;