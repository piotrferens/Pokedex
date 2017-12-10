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
        this.setState({
          pokemons: response.results.map((pokemon, index) => ({
            ...pokemon,
            id: index + 1
          })),
          isLoading: false
        })
      );
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? <p>Loading...</p> : null}
        {this.state.pokemons.map(pokemon => (
          <div key={pokemon.name}>
            <p>{pokemon.name}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.id
              }.png`}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
