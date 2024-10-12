
import { LongTxt } from "../cmps/LongTxt.jsx";
import { AddReview } from "../cmps/AddReview.jsx";
import { bookService } from "../services/book.service.js"
const { useEffect, useState } = React
const { Link, useParams, useNavigate } = ReactRouterDOM




export function BookDetails({ onBack, onGoEdit }) {
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { bookId } = useParams()

  useEffect(() => {
    console.log("Retrieved bookId:", bookId)

    loadBook()
  }, [bookId])
  function loadBook() {
    if (!bookId) {
      console.error("Book ID not found")
      return
    }

    bookService.get(bookId)
      .then((book) => {
        if (!book) {
          console.error("Book not found")
          return
        }
        setBook(book)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load book:", err)
        setIsLoading(false)
      })
  }

  function getBookLng(lng) {
    switch (lng) {
      case "he":
        return "Hebrew"
      case "sp":
        return "Spanish"
      default:
        return "English"
    }
  }

  function getPublishDate() {
    const currYear = new Date().getFullYear()
    let publishedYear = book.publishedDate
    const diff = currYear - publishedYear
    if (diff > 10) publishedYear += " - Vintage"
    else if (diff < 10) publishedYear += " - NEW!"
    return publishedYear;
  }

  function getPageCount() {
    let pageCount = book.pageCount;
    if (book.pageCount > 500) pageCount += " - Long reading"
    else if (book.pageCount > 200) pageCount += " - Decent reading"
    else if (book.pageCount < 100) pageCount += " - Light reading"
    return pageCount;
  }
  function onBookReview(review) {
    bookService.addReview(book, review)
      .then((updatedBook) => {
        console.log('Review added, reloading book data...')
        setBook(updatedBook)
      })
      .catch((err) => {
        console.error("Failed to add review:", err)
      })
  }

  function onDeleteReview(reviewIdx) {
    const updatedReviews = book.reviews.filter((_, idx) => idx !== reviewIdx)
    const updatedBook = { ...book, reviews: updatedReviews }
    
    bookService.deleteReview(book, reviewIdx)
      .then(() => {
        setBook(updatedBook) // 
      })
      .catch((err) => {
        console.error("Failed to delete review:", err)
      })
  }


  if (!book) return <div>Loading...</div>
  const {
    title,
    subtitle,
    thumbnail,
    authors,
    description,
    language,
    categories,
    listPrice,
  } = book;

  return (
    <section className="book-details-container">
      <div className="book-details-title">{title}</div>
      <div className="book-details-subtitle">{subtitle}</div>
      <div className="book-thumbnail-container">
        {listPrice.isOnSale && (
          <div className="book-details-on-sale">On-sale!</div>
        )}
        <img src={thumbnail} />
      </div>
      <div className="book-details-info">
        <div className="book-details-info-row">
          <span className="book-details-info-title">Year publish:</span>
          <span className="book-details-info-text">{getPublishDate()}</span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">
            Author{authors.length > 1 ? "s" : ""}:
          </span>
          <span className="book-details-info-text">{authors.join(", ")}</span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">Language:</span>
          <span className="book-details-info-text">{getBookLng(language)}</span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">Categories:</span>
          <span className="book-details-info-text">
            {categories.join(", ")}
          </span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">Pages:</span>
          <span className="book-details-info-text">{getPageCount()}</span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">Price:</span>
          <span className={"book-details-info-text "}>
            {(listPrice.amount).toLocaleString(
              undefined, { style: 'currency', currency: listPrice.currencyCode })}
          </span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">Description:</span>
          <LongTxt txt={description} />
        </div>

        <div className="book-details-review">
          <span className="book-details-review-list">Reviews:</span>
          {book.reviews && book.reviews.length > 0 ? (
            <ul>
              {book.reviews.map((review, idx) => (
                <li key={idx}>
                  <p>
                    <strong>{review.fullname || "Anonymous"}</strong> - {review.rating || "No rating"}
                  </p>
                  <p>Read at: {review.readAt || "Date not specified"}</p>
                  <button onClick={() => onDeleteReview(idx)}>Delete Review</button>

                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        <div className="book-details-add-review">
          <AddReview book={book} onBookReview={onBookReview} />
          {/* <ReviewList book={book} onRemoveReview={onRemoveReview} /> */}
        </div>

        <div className="book-details-buy-container">
          <button
            className="buy-book-btn"
            onClick={() => alert(`Have a good reading!`)}
          >
            Buy it now!
          </button>
          <div className="actions-btns">
            <button className="go-back-btn" onClick={onBack}>
              ⬅ Go back
            </button>
            <button className="go-edit-btn" onClick={onGoEdit}>
              Go Edit ➡
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
