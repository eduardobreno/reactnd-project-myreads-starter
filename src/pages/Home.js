import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookList from "../components/BookListComponent";

export default class Home extends Component {

  render() {
    const { currentlyReading, wantToRead, read } = this.props.myReads;
    const moveBook = this.props.onMoveBook;

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
                <BookList list={currentlyReading} onMoveBook={moveBook} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookList list={wantToRead} onMoveBook={moveBook} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookList list={read} onMoveBook={moveBook} />
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
