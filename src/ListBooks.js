import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }
    
    render() {
        const {books, onBookUpdate} = this.props
        const shelves = [
            {title: 'Currently Reading', id: 'currentlyReading'},
            {title: 'Want to Read', id: 'wantToRead'},
            {title: 'Read', id: 'read'}
        ]

        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                {shelves.map(shelf => (
                    <div className="list-books-content" key={shelf.id}>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">{shelf.title}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.filter((book) => book.shelf === shelf.id).map(book => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:(book.imageLinks !== undefined) ? `url(${book.imageLinks.thumbnail})`: ''}}></div>
                                                    <div className="book-shelf-changer">
                                                        <select defaultValue={shelf.id} onChange={(event) => onBookUpdate(book, event.target.value)}>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="open-search">
                    <Link className='open-search-button' to='/search'>Add a book</Link>
                </div>
            </div>

        ) 
    }
}

export default ListBooks
