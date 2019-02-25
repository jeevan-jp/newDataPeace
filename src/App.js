import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

class App extends React.Component {
  state = {
    users: null
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
