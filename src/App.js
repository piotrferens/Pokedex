import React, { Component } from "react";
import "./loader.css";

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
            id: index + 1,
            likes: 0
          })),
          isLoading: false
        })
      );
  }
  onSearch = event => {
    const value = event.target.value; // wartosc inputa
    this.setState({ inputText: value });
  };

  incrementLikes = id => {
    this.setState({
      pokemons: this.state.pokemons.map(pokemon => {
        if (pokemon.id === id) {
          return { ...pokemon, likes: pokemon.likes + 1 };
        }
        return pokemon;
      })
    });
  };
  render() {
    const filteredPokemons = this.state.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.state.inputText.toLowerCase())
    );
    return (
      <div>
        {this.state.isLoading ? (
          <Loader />
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {filteredPokemons.slice(0, 50).map(pokemon => (
            <div
              style={{
                margin: 5,
                padding: 10,
                marginBottom: 0
              }}
              key={pokemon.name}
              onClick={() => this.incrementLikes(pokemon.id)}
            >
              <div
                style={{
                  background: "#885EAD"
                }}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.id
                  }.png`}
                />
              </div>
              <p
                style={{
                  textAlign: "center",
                  marginTop: 0,
                  marginBottom: 0,
                  background: "lightblue "
                }}
              >
                {pokemon.name} {pokemon.likes}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function Loader() {
  return <div className="loader" />;
}

export default App;
