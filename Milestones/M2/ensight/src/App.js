import Profile from './pages/Profile.js';
import Header from './components/Header.js';
//import Browse from './pages/Browse.js';
import FooterComponent from './components/FooterComponent.js';
import './App.css';

function App() {
  return (
    <div className="App">
        <Header />
        <Profile />
        <FooterComponent />
    </div>
  );
}

export default App;
