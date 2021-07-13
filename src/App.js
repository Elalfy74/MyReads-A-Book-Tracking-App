import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Tile from './components/title';
import BookShelf from './components/booksshelf'
import { Route } from 'react-router-dom'
import Search from './components/Search';
import { Link } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    Books: []
  }
  //initializing the state with books from the api
  componentDidMount() {
    BooksAPI.getAll()
      .then((Books) => {
        this.setState(() => ({
          Books
        }))
      })
  }
  //method which updates the shelfs Whether from the main page or the search page
  updatecurrent = (book, shelf) => {
    let foundFlag = false;
    //check if this book is in the main array or not
    const updatedArray = this.state.Books
    for (let b of updatedArray) {
      if (b.id === book.id) {
        foundFlag = true
        break;
      }
    }
    //if the book found just update the shelf prop
    if (foundFlag) {
      updatedArray.map(b => {
        if (b.id === book.id) {
          book.shelf = shelf
        }
        return b;
      }
      )
    }
    //if the book does not be found add the shelf to it then push it to the array which holds the books
    if (foundFlag === false) {
      book.shelf = shelf
      updatedArray.push(book)
    }
    //update the state with the new array of books then call the api to update the shelfs
    this.setState({ Books: updatedArray });
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app" >
        {/*identifying the first route which hold the main page and give thoses classes the required props*/}
        <Route exact path='/' render={() => (
          <div className="list-books">
            <Tile />
            <div className="list-books-content">
              <BookShelf Books={this.state.Books.filter((b) => b.shelf === 'currentlyReading')}
                className="booksheelf"
                title="Currenlty Reading"
                updatecurrent={this.updatecurrent}
              />
              <BookShelf Books={this.state.Books.filter((b) => b.shelf === 'wantToRead')}
                className="booksheelf"
                title="Currenlty Reading"
                updatecurrent={this.updatecurrent}
              />
              <BookShelf Books={this.state.Books.filter((b) => b.shelf === 'read')}
                className="booksheelf"
                title="Currenlty Reading"
                updatecurrent={this.updatecurrent}
              />
            </div>
            <div >
              <Link className="open-search"
                to='/search'
              >Add a book</Link>
            </div>
          </div>
        )}
        />
        {/*identifying the second route which hold the search page and give thoses classes the required props*/}
        <Route exact path='/search' render={() => (
          <Search
            updatecurrent={this.updatecurrent}
            currentBooks={this.state.Books}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
