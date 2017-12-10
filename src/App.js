import React, { Component } from "react";

class App extends Component {
  state = {
    pokemons: [],
    isLoading: false,
    inputText: ""
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
  onSearch = event => {
    const value = event.target.value; // wartosc inputa

    this.setState({ inputText: value });
  };
  render() {
    const filteredPokemons = this.state.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.state.inputText.toLowerCase())
    );
    return (
      <div>
        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          <input
            onChange={this.onSearch}
            value={this.state.inputText}
            style={{
              textAlign: "center",
              display: "block",
              margin: "0 auto "
            }}
          />
        )}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredPokemons.slice(0, 30).map(pokemon => (
            <div key={pokemon.name}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.id
                }.png`}
              />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
