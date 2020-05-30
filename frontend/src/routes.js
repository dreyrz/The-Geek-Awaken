
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from "./App"

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </ BrowserRouter>
  );
}

export default Routes;