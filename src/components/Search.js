import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'


class Search extends Component {
  //check valid props
  static propTypes = {
    updatecurrent: PropTypes.func.isRequired,
    currentBooks: PropTypes.array.isRequired
  }
  state = {

    Books: []
  }
  //method which updates the query and the result books


  //method which updates the shelf prop of the result books
  shelfupdate = (newbooks) => {
    //check the validation of search result
    if (newbooks && newbooks.length > 0) {
      //compare the result books with the ones on the main page if they same add the shelf prop 
      newbooks.map(a => {
        this.props.currentBooks.map(b => {
          if (a.id === b.id) {
            const index = this.props.currentBooks.findIndex((book) => book.id === a.id)
            a.shelf = this.props.currentBooks[index].shelf
          }
          return b;
        })
        return a;
      })
    }
  }
  // method which updates the state of the search books by array from the api
  updateSearch = (query) => {
    BooksAPI.search(query)
      .then((newbooks) => {
        //calling method which update the shelf prob then update the state
        this.shelfupdate(newbooks)
        this.setState(() => ({
          Books: newbooks

        }))
      })
  }

  render() {
    const { updatecurrent } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search"
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/* passing the value to update query method */}
            <input type="text" placeholder="Search by title or author"
              //value={this.state.query}
              onChange={(event) => this.updateSearch(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/*check the validation of the search books area before creating the books list */}
            {this.state.Books && this.state.Books.length > 0 && this.state.Books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {/* check if the book has an image thumbnail if it does not add none */}
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks && book.imageLinks.thumbnail) ? `url('${book.imageLinks.thumbnail}')` : 'none' }}></div>
                    <div className="book-shelf-changer">
                      {/*Setting the default value and Passing the new shelf  to the update function  */}
                      <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={(event) => updatecurrent(book, event.target.value)} value={(book.shelf)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {/*Check if the book has one or more authors and update the text depending on it */}
                  <div className="book-authors">{(book.authors && book.authors.length > 1) ? book.authors.join(",") : book.authors}</div>
                </div>
              </li>
            )

            )}
          </ol>
        </div>
      </div>
    )
  }
}
export default Search