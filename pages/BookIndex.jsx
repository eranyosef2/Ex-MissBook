const { Link, useParams, useNavigate } = ReactRouterDOM
import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "./BookEdit.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React


export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const navigate = useNavigate() 

  useEffect(() => {
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
        showSuccessMsg('Book removed successfully')

      })
      .catch((err) => {
        console.log("Problems removing Book:", err)
        showErrorMsg(`Problems removing Book (${bookId})`)

      })
  }

  function onUpdateBook(bookToSave) {
    bookService.save(bookToSave).then((savedBook) => {
      setSelectedBookId(savedBook)
      setIsEdit(false)
      setBooks((books) =>
        books.map((book) => (book.id === savedBook.id ? savedBook : book))
      )
      showSuccessMsg('Book saved successfully')
    })
  }

  function onSetFilter(filterByToEdit) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterByToEdit }))
  }

  function onSelectBookId(bookId) {
    navigate(`/book/${bookId}`)
  }

  if (!books) return <div>Loading...</div>
  return (
    <main>
      {!selectedBookId && (
        <React.Fragment>
          <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
          {!!books.length && (
            <BookList
              books={books}
              onSelectBookId={onSelectBookId}
              onRemoveBook={onRemoveBook}
            />
          )}
          {!books.length && <div>No books</div>}
        </React.Fragment>
      )}
      {selectedBookId && (
        <section>
          {isEdit ? (
            <BookEdit
              book={selectedBookId}
              onUpdate={onUpdateBook}
              onCancelEdit={() => setIsEdit(false)}
            />
          ) : (
            <BookDetails
              book={selectedBookId}
              onBack={() => setSelectedBookId(null)}
              onGoEdit={() => setIsEdit(true)}
            />
          )}
        </section>
      )}
    </main>
  )
}
