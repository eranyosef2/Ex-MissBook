import { bookService } from "../services/book.service.js"
const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM
export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState( null )
  const { bookId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (bookId) loadBook()
  }, [bookId])
  function loadBook() {
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => {
        console.log("Problem getting book:", err)
      })
  }
  function handleChange({ target }) {
    let { value, name: field, type } = target
    switch (type) {
      case "number":
      case "range":
        value = +value
        break
      case "checkbox":
        value = target.checked
        break
    }
    setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
  }
  function handleListPriceChange({ target }) {
    let { value, name: field, type } = target
    switch (type) {
      case "number":
      case "range":
        value = +value
        break
      case "checkbox":
        value = target.checked
        break
    }
    setBookToEdit((prevBook) => ({
      ...prevBook,
      listPrice: { ...prevBook.listPrice, [field]: value },
    }))
  }
  function onSaveBook(ev) {
    ev.preventDefault()
    bookService.save(bookToEdit).then(navigate("/book"))
    showSuccessMsg("Book saved successfully")
  }
  function onCancelEdit() {
    navigate("/book")
  }
  if (!bookToEdit) return <div>Loading...</div>
  return (
    <section className="book-edit">
      <h2 className="edit-book-header">Edit Book</h2>
      <form onSubmit={onSaveBook}>
        <div className="book-details-info-row">
          <label className="book-details-info-title">Title:</label>
          <input
            type="text"
            placeholder="Enter New Title"
            name="title"
            value={bookToEdit.title || ''}
            onChange={handleChange}
          />
        </div>
        <div className="book-details-info-row">
          <label className="book-details-info-title">Description:</label>
          <textarea
            type="text"
            placeholder="Enter New Title"
            name="description"
            value={bookToEdit.description || ''}
            onChange={handleChange}
          />
        </div>
        <div className="book-details-info-row">
          <label className="book-details-info-title">Price:</label>
          <input
            type="number"
            placeholder="Set Price"
            name="amount"
            onChange={handleListPriceChange}
            value={bookToEdit.listPrice ? bookToEdit.listPrice.amount || '' : ''}
          />
        </div>
        <div className="book-details-info-row">
          <label className="book-details-info-title">On Sale:</label>
          <input
            type="checkbox"
            placeholder="Set Price"
            name="isOnSale"
            onChange={handleListPriceChange}
            checked={bookToEdit.listPrice ? bookToEdit.listPrice.isOnSale || false : false}
          />
        </div>
        <div className="book-edit-actions-container">
          <button className="save-edit-btn">Save ✅</button>
          <button
            type="button"
            className="cancel-edit-btn"
            onClick={onCancelEdit}
          >
            Cancel ❎
          </button>
        </div>
      </form>
    </section>
  );
}