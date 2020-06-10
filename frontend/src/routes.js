
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import App from "./App"
import PostFrontView from './pages/postFrontView';
import PostView from './pages/postView';
import PostCatView from './pages/postCatView';

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/postFront" component={PostFrontView}/>
            <Route path="/postView" component={PostView}/>
            <Route path="/postCatView" component={PostCatView}/>
        </Switch>
            {//<Redirect strict from="/postCatView" to="/"/>
            }
    </ BrowserRouter>
  );
}

export default Routes;