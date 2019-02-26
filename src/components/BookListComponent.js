import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as Find from "../helpers/find";

class BookListComponent extends Component {

  getLocalCache() {
    return JSON.parse(localStorage.getItem("myReads"));
  }

  getRightShelf(id) {
    let book = Find.findBookById(id, this.getLocalCache())
    if (book) {
      return book.shelf;
    } else {
      return "none";
    }
  }

  onChange = (book, event) => {
    let el = event.nativeEvent.target;
    let index = el.selectedIndex
    let shelf = el[index].value;
    this.props.onMoveBook(book, shelf);
  }
  render() {
    const { list } = this.props;
    return (
      <ol className="books-grid">
        {list.length === 0 && "Nothing to show"}
        {list.map(book => {
          let shelf = book.shelf || this.getRightShelf(book.id);
          return (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${book.imageLinks.thumbnail}")`
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select onChange={(event) => (this.onChange(book, event))}
                      value={shelf}>
                      <option value="move" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read" >Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && <div className="book-authors">{book.authors[0]}</div>}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
}


BookListComponent.propTypes = {
  list: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired
}

export default BookListComponent;
