import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))

  useEffect(() => {
    setSearchParams(utilService.getTruthyValues(filterBy))
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => console.log("err:", err))
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId))
        showSuccessMsg("Book removed successfully")
      })
      .catch((err) => {
        console.log("Problems removing Book:", err)
        showErrorMsg(`Problems removing book (${bookId})`)
      })
  }

  function onSetFilter(filterByToEdit) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterByToEdit }))
  }

  if (!books) return <div>Loading...</div>
  return (
    <main>
      <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      {!!books.length && <BookList books={books} onRemoveBook={onRemoveBook} />}
      {!books.length && <div>No books</div>}
    </main>
  )
}
