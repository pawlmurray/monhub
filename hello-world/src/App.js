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

function MonsterDrop(props) {
  return (
    <l>{props.name}    {props.percent}%    {props.source}</l>
  )
}

class MonsterInfo {
  constructor(name, weaknesses, attackTypes) {
    this.name = name;
    this.weaknesses = weaknesses;
    this.attackTypes = attackTypes;
  }
}

function MonsterBody(props) {
  return (
    <p>
      {props.monsterInfo.name}
      <p>
        Weaknesses: 
        {props.monsterInfo.weaknesses.map(function(weakness) {
          return <l> {weakness}</l>
        })}
      </p>
      <p>
        AttackTypes:
        {props.monsterInfo.attackTypes.map(function(attackType) {
          return <l> {attackType}</l>
        })}
      </p>
      <p>
        <button className="textbox" onClick={() => props.onBack()}>
          BACK
        </button>
      </p>
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
    const monster = this.lookupInfo(name);
    this.setState({showList:false, currentMonster:monster});
  }

  handleBodyBackClick() {
    this.setState({showList:true, currentMonster:null});
  }

  render() {
    if (this.state.showList) {
      return <MonsterList monsterList={["Barioth", "Rathalos", "Zinogre"]} onClick={(name) => this.handleNameClick(name)} />;
    } else {
      return <MonsterBody monsterInfo={this.state.currentMonster} onBack={() => this.handleBodyBackClick()} />;
    }
  }

  lookupInfo(name) {
    switch (name) {
      case "Barioth":
        var weaknesses = ["Fire", "Water"];
        var attackTypes =["Ice"]
        return new MonsterInfo(name, weaknesses, attackTypes);
      case "Rathalos":
        var weaknesses = ["Dragon", "Thunder"];
        var attackTypes = ["Fire"]
        return new MonsterInfo(name, weaknesses, attackTypes);
      case "Zinogre":
        var weaknesses = ["Fire"];
        var attackTypes = ["Thunder"];
        return new MonsterInfo(name, weaknesses, attackTypes);
      default:
        return new MonsterInfo("Not Found", [], []);
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
