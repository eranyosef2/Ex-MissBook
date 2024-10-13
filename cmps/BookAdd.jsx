const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { utilService } from '../services/util.service.js'

export function BookAdd() {
  const [searchBook, setSearchBook] = useState("")
  const [books, setBooks] = useState([])
  useEffect(() => {
    if (searchBook) {
      const debounce = setTimeout(() => {
        fetchBooks(searchBook)
      }, 3000)
      return () => clearTimeout(debounce)
    }
  }, [searchBook])
  function fetchBooks(searchBook) {
    fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchBook}`)
      .then((response) => response.json())
      .then((data) => {
        const books = data.items
        setBooks(
            books.map((book) => ({
                id: book.id,
                title: book.volumeInfo.title || '',
                subtitle: book.volumeInfo.subtitle || '',
                authors: book.volumeInfo.authors || '',
                description: book.volumeInfo.description || '',
                language: book.volumeInfo.language || '',
                categories: book.volumeInfo.categories || '',
                listPrice:{
                    amount: book.volumeInfo.amount || utilService.getRandomBookPrice(5, 100),
                    currencyCode: book.volumeInfo.currencyCode || 'ILS',
                    isOnSale: book.volumeInfo.isOnSale || false,
                },
                publishedDate: book.volumeInfo.publishedDate || '',
                pageCount: book.volumeInfo.pageCount || '',
                thumbnail: book.volumeInfo.imageLinks.thumbnail || '',
          }))
        )
      })
      .catch((err) => console.error("Error fetching books:", err))
  }
  function onAddBook(googleBook) {
      bookService.addGoogleBook(googleBook)
      setBooks([])
    }
  return (
    <div className="book-add-container">
      <input
        type="text"
        placeholder="Search a book..."
        value={searchBook}
        onChange={(event) => setSearchBook(event.target.value)}
      />
      <button onClick={() => fetchBooks(searchBook)}>Search</button>
      <ul>
        {books.map((googleBook) => (
          <li key={googleBook.id}>
            <span>{googleBook.title}</span>
            <button onClick={() => onAddBook(googleBook)}>+</button>
          </li>
        ))}
      </ul>
    </div>
  )
}