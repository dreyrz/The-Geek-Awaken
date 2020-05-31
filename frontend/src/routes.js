
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from "./App"
import PostView from './pages/postView';

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/post" component={PostView}/>
        </Switch>
    </ BrowserRouter>
  );
}

export default Routes;