import ProfileTabs from './components/Tabs/ProfileTabs';
import Header from './components/Header.js';
import Test from './components/Test.js';
import FooterComponent from './components/FooterComponent.js';
import './App.css';

function App() {
  return (
    <div className="App">
      {/*<Header />*/}
        
      <Test/>
        <ProfileTabs />
        <FooterComponent />
    </div>
  );
}

export default App;
