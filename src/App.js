import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import CardList from "./component/card-list/card-list.component";
import SearchBox from "./component/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filterdMonsters, setFilterdMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((user) => setMonsters(user));
  }, [""]);

  useEffect(() => {
    const newFilterdMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilterdMonsters(newFilterdMonsters);
  }, [monsters, searchField]);
  const onSearchChange = (event) => {
    const searchfieldString = event.target.value.toLowerCase();

    setSearchField(searchfieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder={"search monster"}
        className={"search-box"}
      />

      <CardList monsters={filterdMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchfield: "",
//     };
//   }
//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((user) =>
//         this.setState(
//           () => {
//             return {
//               monsters: user,
//             };
//           },
//           () => {}
//         )
//       );
//   }
//   onSearchChange = (event) => {
//     const searchfield = event.target.value.toLowerCase();

//     this.setState(
//       () => {
//         return {
//           searchfield,
//         };
//       },
//       () => {}
//     );
//   };
//   render() {
//     const { monsters, searchfield } = this.state;
//     const { onSearchChange } = this;
//     const filterdMonsters = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchfield);
//     });
//     return (
//       <div className="App">
//         <h1 className="app-title">monsters Rolodex</h1>
//         <SearchBox
//           onChangeHandler={onSearchChange}
//           placeholder={"search monster"}
//           className={"search-box"}
//         />
//         <CardList monsters={filterdMonsters} />
//       </div>
//     );
//   }
// }

export default App;
