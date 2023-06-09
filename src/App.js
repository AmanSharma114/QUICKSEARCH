import React, { useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Routess } from './components/Routes'; // Update import statement
import { StateContextProvider } from './contexts/StateContextProvider';
const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen">
        <Navbar setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
        <Routess /> {/* Update component usage */}
        <Footer />
      </div>
    </div>
  );
};

export default () => (
  <StateContextProvider>
    <App />
  </StateContextProvider>
);
