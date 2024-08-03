import './App.css';
import Navbar from './components/Navbar';
import ClickableSection from './components/ClickableSection';

function App() {
  return (
      <div className="App">
        <Navbar />
        <div className='app-body'>
          <ClickableSection/>
        </div>
      </div>
  );
}

export default App;
