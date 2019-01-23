import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchList: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
  }

  updateBooks = (book, shelf) => {
    if (shelf === 'none') {
      this.setState({books: this.state.books.filter(b => b.id !== book.id)})
    } else if (this.state.books.filter(b => b.id === book.id).length === 0) {
      book.shelf = shelf
      this.setState({books: this.state.books.concat([book])})
    } else {
        this.setState({books: this.state.books.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf
          }
          return b
        })})
    }
    BooksAPI.update(book, shelf)
  }

  updateSearchList = (query) => {
    var match
    if (query === '') {
      this.setState({searchList: []})
    } else {
      BooksAPI.search(query).then(bookJSON => {
        if ((bookJSON !== undefined) && (!bookJSON.error)) {
          bookJSON.map(searchBook => {
            match = this.state.books.filter(shelfBook => shelfBook.id === searchBook.id)
            if (match.length !== 0) {
              searchBook.shelf = match[0].shelf
            }
            return searchBook
          })
        }
        this.setState({searchList: ((bookJSON !== undefined && (!bookJSON.error)) ? bookJSON: [])})
      }).catch()
    }
  }

  clearSearchList = () => {
    this.setState({searchList: []})
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            onBookUpdate={this.updateBooks}
            books={this.state.books}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
            onSearchUpdate={(query) => this.updateSearchList(query)}
            searchList={this.state.searchList}
            onBookUpdate={(book, shelf) => this.updateBooks(book, shelf)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
