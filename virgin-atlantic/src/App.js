import './App.css';

import NavBar from './Components/NavBar'


import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Home from "./Components/Home/Home";

function App() {

  return (
    <div className="App">
      <NavBar />
      <main>
        <Switch>
            <Route exact path="/about" ><About /></Route>
            <Route exact path="/contact"><Contact /></Route>
            <Route exact path="/home"><Home /></Route>
            <Route path="/"><Redirect to='/Home'/></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
