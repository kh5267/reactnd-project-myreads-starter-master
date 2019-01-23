import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends React.Component {
    state = {
        query: ''
    }
    
    static propTypes = {
        onSearchUpdate: PropTypes.func.isRequired,
        searchList: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
    }

    updateQuery = (query) => {
        this.props.onSearchUpdate(query)
        this.setState({query})
    }

    updateBook = (book, shelf) => {
        this.props.onBookUpdate(book, shelf)
    }

    componentDidMount() {
        this.updateQuery('')
    }

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.searchList.map(book => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks !== undefined) ? `url(${book.imageLinks.thumbnail})`: ''}}></div>
                                        <div className="book-shelf-changer">
                                            <select defaultValue={book.shelf === undefined ? 'none': book.shelf} onChange={(event) => this.updateBook(book, event.target.value)}>
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
        )
    }
}

export default SearchBooks