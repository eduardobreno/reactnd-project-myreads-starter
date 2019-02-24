import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import BookList from "./components/BookListComponent";

export default class Home extends Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };
  componentDidMount() {
    BooksAPI.getAll().then(res => {
      let books = this.state.books;
      res.map(book => {
        return books[book.shelf].push(book);
      });
      this.setState({ books });
    });
  }

  render() {
    let { currentlyReading, wantToRead, read } = this.state.books;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BookList list={currentlyReading} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookList list={wantToRead} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookList list={read} />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}
