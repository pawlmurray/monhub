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

class MonsterInfo {
  constructor(name, weaknesses, attackTypes, monsterDrops) {
    this.name = name;
    this.weaknesses = weaknesses;
    this.attackTypes = attackTypes;
    this.monsterDrops = monsterDrops;
  }
}

class DropInfo {
  constructor(name, percent, source) {
    this.name = name;
    this.percent = percent;
    this.source = source;
  }
}

function MonsterDrop(props) {
  return (
    <l>{props.name}    {props.percent}%    {props.source}</l>
  )
}

function MonsterDropContainer(props) {
  if (props.isShowing) {
    return (
      <l>
        <p>
          <button className="textbox" onClick={() => props.onClick()}>
            Hide Drops
          </button>
        </p>
        {props.monsterDrops.map(function(drop) {
          return <p><MonsterDrop name={drop.name} percent={drop.percent} source={drop.source} /></p>;
        })}
      </l>
    )
  } else {
    return (
      <p>
        <button className="textbox" onClick={() => props.onClick()}>
          Show Drops
        </button>
      </p>
    )
  }
}

class MonsterBody extends Component {

  constructor() {
    super();
    this.state = {
      showingDrops: false,
    };
  }

  clickDropContainer() {
    this.setState({showingDrops:!this.state.showingDrops});
  }

  render() {
    return (
      <p>
        {this.props.monsterInfo.name}
        <p>
          Weaknesses: 
          {this.props.monsterInfo.weaknesses.map(function(weakness) {
            return <l> {weakness}</l>
          })}
        </p>
        <p>
          AttackTypes:
          {this.props.monsterInfo.attackTypes.map(function(attackType) {
            return <l> {attackType}</l>
          })}
        </p>
        <MonsterDropContainer isShowing={this.state.showingDrops} 
                              monsterDrops={this.props.monsterInfo.monsterDrops} 
                              onClick={() => this.clickDropContainer()} />
        <p>
          <button className="textbox" onClick={() => this.props.onBack()}>
            BACK
          </button>
        </p>
      </p>
    );
  }
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
        var dropOne = new DropInfo("Barioth Claw", "10", "Carve");
        var dropTwo = new DropInfo("Barioth Fang", "5", "Break");
        var dropThree = new DropInfo("Barioth Plate", "1", "Capture");
        return new MonsterInfo(name, weaknesses, attackTypes, [dropOne, dropTwo, dropThree]);
      case "Rathalos":
        var weaknesses = ["Dragon", "Thunder"];
        var attackTypes = ["Fire"]
        var dropOne = new DropInfo("Rathalos Scale", "12", "Carve");
        var dropTwo = new DropInfo("Fire Sack", "7", "Carve");
        var dropThree = new DropInfo("Rathalos Plate", "1", "Capture");
        var dropFour = new DropInfo("Rath Medula", "1", "Break");
        return new MonsterInfo(name, weaknesses, attackTypes, [dropOne, dropTwo, dropThree, dropFour]);
      case "Zinogre":
        var weaknesses = ["Fire"];
        var attackTypes = ["Thunder"];
        var dropOne = new DropInfo("Electro Fur", "5", "Carve");
        var dropTwo = new DropInfo("Zinogre Jasper", "1", "Capture");
        return new MonsterInfo(name, weaknesses, attackTypes, [dropOne, dropTwo]);
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
          <h2>Mon Hub Test</h2>
        </div>
        <ScanBody/>
      </div>
    );
  }
}

export default App;
