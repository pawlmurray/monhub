import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function MonsterLink(props) {
  return (
    <button className="textbox" onClick={() => props.onClick()}>
      {props.name}
    </button>
  );
}

function MonsterList(props) {
  return (
    <p>
      {props.monsterList.map(function(monName){
        return (
          <p><MonsterLink name={monName} onClick={props.onClick(monName)}/></p>
        );
      })}
    </p>
  );
}

class ScanBody extends Component {
  constructor() {
    super();
    this.state = {
      showList: true,
    }
  }

  handleNameClick(name) {
    this.setState({showList: false});
  }

  render() {
    if (this.state.showList) {
      return <MonsterList monsterList={["Arzuros", "Great Jaggi", "Rathian"]} onClick={(name) => this.handleNameClick(name)}/>
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Mon Scan Test</h2>
        </div>
        <ScanBody/>
      </div>
    );
  }
}

export default App;
