import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { Navbar } from './Navbar';
import {Signup} from './Signup';
import {Login} from './Login';

function App(){
  return(
    <section className="App">
      <Navbar />
      <Signup />
      <Login />
      
    </section>
  );
}


ReactDOM.render(<App/>, document.getElementById('root'));