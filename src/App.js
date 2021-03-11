import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

// importing components!
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
import RegisterComponent from './components/RegisterComponent';
import LogoutComponent from './components/LogoutComponent';
import ProfileComponent from './components/ProfileComponent';
import PostComponent from './components/PostComponent';
import BlogComponent from './components/BlogComponent';

class App extends Component{
  render() {
    return(
      <Router>
        <div className = "App">
          <Switch>
            <Route exact path = "/">
              <LoginComponent/>
            </Route>
            <Route path = "/dashboard">
              <DashboardComponent/>
            </Route>
            <Route path = "/register">
              <RegisterComponent/>
            </Route>
            <Route path = "/profile">
              <ProfileComponent/>
            </Route>
            <Route path = "/create-a-blog">
              <PostComponent/>
            </Route>
            <Route path = "/blog/:id">
              <BlogComponent/>
            </Route>
            <Route path = "/logout">
              <LogoutComponent/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
