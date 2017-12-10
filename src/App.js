import React, { Component } from "react";

class App extends Component {
  state = {
    pokemons: [],
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("https://pokeapi.co/api/v2/pokemon/?limit=784")
      .then(response => response.json())
      .then(response =>
        this.setState({ pokemons: response.results, isLoading: false })
      );
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? <p>Loading...</p> : null}
        {this.state.pokemons.map(pokemon => (
          <p key={pokemon.name}>{pokemon.name}</p>
        ))}
      </div>
    );
  }
}

export default App;
