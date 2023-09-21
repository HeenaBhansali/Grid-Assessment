import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Homepage from './components/Homepage';
import ReactGridLayoutPage from './components/ReactGridLayout/ReactGridLayoutPage';
import CustomizableDropdownPage from './components/CustomizableDropdown/CustomizableDropdownPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/react-grid-layout" element={<ReactGridLayoutPage />} />
        <Route path="/customizable-dropdown" element={<CustomizableDropdownPage />} />
      </Routes>
    </Router>
  );
};

export default App;
