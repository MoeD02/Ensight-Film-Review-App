import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import FooterComponent from './components/FooterComponent';

import Home from './pages/Home';
import Profile from './pages/Profile'; 
import Browse from './pages/Browse';
import Feed from './pages/Feed';
import DisplayList from './pages/DisplayList';
import DisplayMovie from './pages/DisplayMovie';
import DisplayUser from './pages/DisplayUser';
import LoginPage from './pages/LoginPage';
import About from './pages/About';
import './App.css';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/DisplayList" element={<DisplayList />} />
        <Route path="/DisplayMovie" element={<DisplayMovie />} />
        <Route path="/DisplayUser" element={<DisplayUser />} />
        <Route path="/Feed" element={<Feed />} />
        <Route path="/Profile/:ProfileTabs" element={<Profile />} />
        {/* <Route path="../pages/Profile" element={<Diary />} /> */}
        <Route path="/Profile" element={<Profile />} />
        <Route path="/About" element={<About />} />
        {/* <Route path="../pages/Profile" element={<Settings />} /> */}
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;