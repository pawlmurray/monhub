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
          <p><MonsterLink name={monName} onClick={() => props.onClick(monName)} /></p>
        );
      })}
    </p>
  );
}

function MonsterBody(props) {
  return (
    <p>
      {props.monsterName}
      <p></p>
      <button className="textbox" onClick={() => props.onBack()}>
        BACK
      </button>
    </p>
  );
}

class ScanBody extends Component {
  constructor() {
    super();
    this.state = {
      showList: true,
      currentMonster: null,
    };
  }

  handleNameClick(name) {
    this.setState({showList:false, currentMonster:name});
  }

  handleBodyBackClick() {
    this.setState({showList:true, currentMonster:null});
  }

  render() {
    if (this.state.showList) {
      return <MonsterList monsterList={["Arzuros", "Great Jaggi", "Rathian"]} onClick={(name) => this.handleNameClick(name)} />;
    } else {
      return <MonsterBody monsterName={this.state.currentMonster} onBack={() => this.handleBodyBackClick()} />;
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
