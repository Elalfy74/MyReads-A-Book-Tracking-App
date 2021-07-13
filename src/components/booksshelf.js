import React, { Component } from 'react';
import PropTypes from 'prop-types'
class BookShelf extends Component {
    //check valid props
    static propTypes = {
        Books: PropTypes.array.isRequired,
        updatecurrent: PropTypes.func.isRequired,
    }
    render() {
        //assign the props to variables
        const { title, Books, updatecurrent } = this.props

        //filter the books to get three arrays of the required shelfs



        return (
            <div>
                {/* currently reading shelf */}
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {/*mapping on the array and build the first books shelf */}
                            {Books.map((book) =>
                            (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            {/* check if the book has an image thumbnail if it does not add none */}
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks && book.imageLinks.thumbnail) ? `url('${book.imageLinks.thumbnail}')` : 'none' }}></div>
                                            <div className="book-shelf-changer">
                                                {/*Passing the new shelf and book to the update function */}
                                                <select onChange={(event) => updatecurrent(book, event.target.value)} value={(book.shelf)}>
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
            </div>

        )
    }

}

export default BookShelf
