import React from "react";
import { Route } from 'react-router-dom'
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import Home from "./pages/Home";
import Search from "./pages/Search";
import * as Find from "./helpers/find";

class BooksApp extends React.Component {

  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      const books = this.state.books;
      res.forEach(book => {
        books[book.shelf].push(book);
      });
      this.setState({ books });
      const { currentlyReading, wantToRead, read } = books;
      const listCache = currentlyReading.concat(wantToRead).concat(read);
      this.saveListCache(listCache);
    });
  }

  onMoveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      this.updateBookList(res);
    });
  }

  saveListCache = (list) => {
    localStorage.setItem("myReads", JSON.stringify(list));
  }


  updateBookList = (newBookList) => {
    const currentlyReadingTmp = []
    const wantToReadTmp = []
    const readTmp = []
    const { currentlyReading, wantToRead, read } = this.state.books;
    const books = currentlyReading.concat(wantToRead).concat(read);

    newBookList.currentlyReading.forEach(id => {
      let book = Find.findBookById(id, books);
      if (book) {
        book.shelf = "currentlyReading";
        currentlyReadingTmp.push(book);
      }
    });
    newBookList.wantToRead.forEach(id => {
      let book = Find.findBookById(id, books);
      if (book) {
        book.shelf = "wantToRead";
        wantToReadTmp.push(book);
      }
    });
    newBookList.read.forEach(id => {
      let book = Find.findBookById(id, books);
      if (book) {
        book.shelf = "read";
        readTmp.push(book)
      }
    });

    this.setState({
      books: {
        currentlyReading: currentlyReadingTmp,
        wantToRead: wantToReadTmp,
        read: readTmp
      }
    });
    const listCache = currentlyReadingTmp.concat(wantToReadTmp).concat(readTmp);
    this.saveListCache(listCache);

  }

  render() {
    let { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/search' component={() => (<Search onMoveBook={this.onMoveBook} />)} />
        <Route exact path='/' render={() => (<Home myReads={books} onMoveBook={this.onMoveBook} />)} />
      </div>
    );
  }
}

export default BooksApp;
