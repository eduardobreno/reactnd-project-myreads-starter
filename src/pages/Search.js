import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BookList from "../components/BookListComponent";

export default class Search extends Component {
    state = {
        searchResult: []
    }
    timeout;

    handleSearch = (event) => {
        clearTimeout(this.timeout);
        const term = event.nativeEvent.target.value
        this.timeout = setTimeout(() => {
            this.search(term);
        }, 500)
    }

    search = (term) => {
        if (term.length === 0) {
            this.setState({ searchResult: [] });
            return;
        }
        BooksAPI.search(term).then(res => {
            if (res.error) {
                this.setState({ searchResult: [] })
            } else {
                this.setState({ searchResult: res })
            }

        })
    }

    render() {
        const { searchResult } = this.state;
        const moveBook = this.props.onMoveBook;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            autoFocus
                            onChange={this.handleSearch} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookList list={searchResult} onMoveBook={moveBook} />
                </div>
            </div>
        )
    }
}