import ProfileTabs from './components/Tabs/ProfileTabs';
import Header from './components/Header.js';
import FooterComponent from './components/FooterComponent.js';
import './App.css';

function App() {
  return (
    <div className="App">
        <Header />
        <ProfileTabs />
        <FooterComponent />
    </div>
  );
}

export default App;
