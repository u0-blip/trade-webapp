import React from 'react';
import './App.css';
import Header from './header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './appDefinedAction';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./redux/store";
import Home from './pages/home';
import AuthRoute from './util/auth/AuthRoute';
import Login from './util/auth/Login';
import Signup from './util/auth/Signup';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';
import Axios from 'axios';
import Profile from './pages/profile';

Axios.defaults.baseURL = 'http://127.0.0.1:8000';

const client = new ApolloClient({
  uri: Axios.defaults.baseURL + '/graphql/',
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem('authToken') || ""
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`
      }
    })
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem('authToken')
    }
  }
});

const theme = createMuiTheme({
  spread: {
    colors: {
      lightBlue: "#3c8dbc",
      red: "#f56954",
      green: "#00a65a",
      aqua: "#00c0ef",
      yellow: "#f39c12",
      blue: "#0073b7",
      navy: "#001F3F",
      teal: "#39CCCC",
      olive: "#3D9970",
      lime: "#01FF70",
      orange: "#FF851B",
      fuchsia: "#F012BE",
      purple: "#8E24AA",
      maroon: "#D81B60",
      black: "#222222",
      gray: "#d2d6de"
    },
    //The standard screen sizes that bootstrap uses.
    //If you change these in the variables.less file, change
    //them here too.
    screenSizes: {
      xs: 480,
      sm: 768,
      md: 992,
      lg: 1200
    }
  }
})


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>

        <ApolloProvider client={client}>
          <Router>
            <div className="App">
              <Header />

              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route path='/profile/:id' component={Profile} />

              </Switch>
            </div>
          </Router>
        </ApolloProvider>
      </Provider>
    </MuiThemeProvider>
  );
}


const IS_LOGGED_IN_QUERY = gql`
    query {
        isLoggedIn @client
    }
`;


export const GET_SELF_QUERY = gql`
  {
    userself {
      id
      username
      email
    }
  }
`;

export const GET_USER_QUERY = gql`
  query ($id:Int!){
    user (id: $id){
      id
      username
      email
      dateJoined
    }
  }
`;

export default App;
