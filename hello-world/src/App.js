import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function MonsterLink(props) {
  return (
    <button className="textbox">
      {props.name}
    </button>
  );
}

function MonsterList(props) {
  return (
    <nl>
      {props.monsterList.map(function(monName){
        return (
          <p><MonsterLink name={monName}/></p>
        );
      })}
    </nl>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Mon Scan Test</h2>
        </div>
        <p className="main">
          <MonsterList monsterList={["Arzuros", "Great Jaggi", "Rathian"]}/>
        </p>
      </div>
    );
  }
}

export default App;
