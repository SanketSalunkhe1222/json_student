import {Route,Routes} from 'react-router-dom';
import './App.css';
import JsonProcessor from './Components/JsonProcessor';
import SendAgainEndpoint from './Components/SendAgainEndpoint';
import React from 'react';

function App() {


  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<JsonProcessor/>} />
          <Route path='/sendagain' element={<SendAgainEndpoint/>} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
