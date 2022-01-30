import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlayerButtons from './Buttons/PlayerButtons';

const App: React.FC = () => {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <PlayerButtons/>
      </div>
    );
  
}

export default App;
