import React from 'react';
import queryString from 'query-string';
import seedrandom from 'seedrandom';
import items from './items.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    let params = queryString.parse(props.location.search);
    let seed = params.seed;
    let requestCount = params.count ?? 0;
    let itemCount = requestCount > 0 ? requestCount : 5;
    let newSeed = Date.now();
    let returnedItems = [];
    let rng = new seedrandom(seed);

    for(let i = 0; i < requestCount; i++) {
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
      <div>
        <header>
          <h1>Run Scavenger Roulette</h1>
        </header>
        <form method="GET" action="/">
          <p><label htmlFor="count">How many items to include in the scavenger hunt?</label><br/>
          <input name="count" type="number" max={this.state.items.length} defaultValue={this.state.itemCount} ref={this.input} /></p>
          <input type="hidden" name="seed" value={this.state.newSeed} />
          <p><input type="submit" value="Get scavenger list" /></p>
        </form>
        <ul>          
          { this.state.returnedItems.map(r => {
            return (<li>{r}</li>);
          }) }  
        </ul>
        <h2>Instructions</h2>
        <p>Before your run, get a new scavenger list. Adjust the number of items to include for a 
          longer or shorter run. In theory, more items equals more miles.</p>
        <p>Now run and find all the things on the list! The run is over when you've found everything
          (or when you want to be done. It's your life.)
        </p>
      </div>
    );
  }
}

export default App;
