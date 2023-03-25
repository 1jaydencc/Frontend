import './App.css';
import Logo from './logo';
import SearchBar from './searchBar';
import Upload from './upload';
import "bootstrap/dist/css/bootstrap.min.css";
import Results from './results';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const resultsRef = useRef(null);

  const renderResults = () => {
    setShowResults(true);
  }

  const renderTerm = (text) => {
    setSearchTerm(text);
  }

  return (
    <div className="App">
      <div className='topBar'>
        <div id='logo'>
          <Logo/>
        </div>
        <div id='search'>
          <SearchBar renderResults={renderResults} renderTerm={renderTerm} />
        </div>
        <div id='upload'>
          <Upload/>
        </div>
        <div id='results'>
          {showResults && searchTerm && <Results showResults={showResults} queryTerm={searchTerm}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
