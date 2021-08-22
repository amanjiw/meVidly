import React, { Component } from 'react';
import Movies from './components/movies';
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/fonts/"
import"bootstrap-icons/font/bootstrap-icons.css"
import './App.css';





class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        
        <main className="container">
          <Movies />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
