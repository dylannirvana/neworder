import React, { Component } from 'react';
import BasicLayout from './BasicLayout';

class App extends Component {
  render() {
    const grid = ["Tom", "Peter", "Lary", "Jason", "Bill", "Davis","Tony", "Phil", "Ken", "Jacob"]
    return (
      <div className="App">
        <BasicLayout data={grid}/>
      </div>
    );
  }
}
export default App;