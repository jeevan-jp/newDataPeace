import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
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
          <Route path="/users/:id" component={UserDetails} />
          <Route path="/not-found" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
