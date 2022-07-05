import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CardList from "./component/card-list/card-list.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchfield: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((user) =>
        this.setState(
          () => {
            return {
              monsters: user,
            };
          },
          () => {}
        )
      );
  }
  onSearchChange = (event) => {
    const searchfield = event.target.value.toLowerCase();

    this.setState(
      () => {
        return {
          searchfield,
        };
      },
      () => {}
    );
  };
  render() {
    const { monsters, searchfield } = this.state;
    const { onSearchChange } = this;
    const filterdMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchfield);
    });
    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="search monster"
          onChange={onSearchChange}
        />
        {/* <CardList /> */}
        {filterdMonsters.map((monster) => {
          return <h1 key={monster.id}>{monster.name}</h1>;
        })}
      </div>
    );
  }
}

export default App;
