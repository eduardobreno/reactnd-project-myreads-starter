import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BookList from "../components/BookListComponent";

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
      const books = this.state.books;
      res.forEach(book => {
        books[book.shelf].push(book);
      });
      this.setState({ books });
    });
  }

  onMoveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      this.updateBookList(res);
    });
  }

  updateBookList = (newBookList) => {
    const currentlyReadingTmp = []
    const wantToReadTmp = []
    const readTmp = []

    newBookList.currentlyReading.forEach(id => {
      let book = this.findBookById(id);
      if (book)
        currentlyReadingTmp.push(book)
    });
    newBookList.wantToRead.forEach(id => {
      let book = this.findBookById(id);
      if (book)
        wantToReadTmp.push(book)
    });
    newBookList.read.forEach(id => {
      let book = this.findBookById(id);
      if (book)
        readTmp.push(book)
    });

    this.setState({
      books: {
        currentlyReading: currentlyReadingTmp,
        wantToRead: wantToReadTmp,
        read: readTmp
      }
    });

  }

  findBookById = (id) => {
    const { currentlyReading, wantToRead, read } = this.state.books;
    const books = currentlyReading.concat(wantToRead).concat(read);
    //search in array if has id and return book object
    let book = books.find(item => (item.id === id ? item : false));
    return book;
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state.books;

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
                <BookList list={currentlyReading} onMoveBook={this.onMoveBook} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookList list={wantToRead} onMoveBook={this.onMoveBook} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookList list={read} onMoveBook={this.onMoveBook} />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div >
    );
  }
}
