import React from "react";
import { Route } from 'react-router-dom'
import "./App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";

class BooksApp extends React.Component {
  state = {

  };

  render() {
    let { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/search' component={Search} />
        <Route exact path='/' render={() => (<Home myReads={books} />)} />
      </div>
    );
  }
}

export default BooksApp;
