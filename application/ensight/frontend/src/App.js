//import Profile from './pages/Profile.js';
//import Header from './components/Header.js';
//import Browse from './pages/Browse.js';
//import FooterComponent from './components/FooterComponent.js';
//import DisplayMovie from './pages/DisplayMovie.js';
//import Home from './pages/Home';
//import DisplayMovie from './pages/DisplayMovie.js'
//import MovieLanding from './pages/MovieLanding.js'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import FooterComponent from './components/FooterComponent';

import Home from './pages/Home';
import Profile from './pages/Profile'; 
import Browse from './pages/Browse';
import DisplayList from './pages/DisplayList';
import DisplayMovie from './pages/DisplayMovie';
import DisplayUser from './pages/DisplayUser';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
    const [authToken, setAuthToken] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        if(token) {
            setAuthToken(token);
        }
    }, [])
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
        <Route path="/LoginPage" element={<LoginPage />} />
        {/* <Route path="../pages/Feed" element={<Feed />} /> */}
        <Route path="/Profile" element={<Profile />} />
        {/* <Route path="../pages/Profile" element={<Diary />} /> */}
        <Route path="/Profile" element={<Profile />} />
        {/* <Route path="../pages/Profile" element={<About />} /> */}
        {/* <Route path="../pages/Profile" element={<Settings />} /> */}
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;