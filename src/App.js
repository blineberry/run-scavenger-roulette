import React from 'react';
import queryString from 'query-string';
import seedrandom from 'seedrandom';
import logo from './logo.svg';
import './App.css';
import items from './items.json';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);

    let params = queryString.parse(props.location.search);
    let seed = params.seed;
    let itemCount = params.count ?? 0;
    let newSeed = Date.now();
    let returnedItems = [];
    let rng = new seedrandom(seed);

    for(let i = 0; i < itemCount; i++) {
      let item = items[Math.floor(rng() * items.length)];

      while (returnedItems.includes(item)) {
        item = items[Math.floor(rng() * items.length)];
      }

      returnedItems.push(item);
    }

    this.state = {
      newSeed,
      itemCount,
      items,
      returnedItems
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({itemCount: event.target.value});
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <h1>Run Scavenger Roulette</h1>
        </header>
        <form method="GET" action="/">
          <label htmlFor="count">How many items to include in the scavenger hunt?</label>
          <input name="count" type="number" max={this.state.items.length} defaultValue={this.state.itemCount} ref={this.input} />
          <input type="hidden" name="seed" value={this.state.newSeed} />
          <input type="submit" value="Get scavenger list" />
        </form>
        <ul>          
          { this.state.returnedItems.map(r => {
            return (<li>{r}</li>);
          }) }  
        </ul>   
      </div>
    );
  }
}

export default App;
