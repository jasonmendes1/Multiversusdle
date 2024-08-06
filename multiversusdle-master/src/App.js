import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Multiversusdle from "./Multiversusdle";
import NotFound from "./NotFound";
import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterCard from "./components/CharacterCard";
import Characters from "./components/Characters";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Multiversusdle />
            </Route>
            <Route path="/characterlist">
              <CharacterList />
            </Route>
            <Route path="/charactercard">
              <CharacterCard />
            </Route>
            <Route path="/characters">
              <Characters />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
