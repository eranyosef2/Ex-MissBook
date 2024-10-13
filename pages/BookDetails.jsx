import { LongTxt } from "../cmps/LongTxt.jsx";
import { AddReview } from "../cmps/AddReview.jsx";
import { bookService } from "../services/book.service.js";

const { useEffect, useState } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function BookDetails() {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadBook();
  }, [bookId]);

  function loadBook() {
    bookService
      .get(bookId)
      .then(setBook)
      .catch((err) => {
        console.log("Problem getting book:", err);
      });
  }

  function getBookLng(lng) {
    switch (lng) {
      case "he":
        return "Hebrew";
      case "sp":
        return "Spanish";
      default:
        return "English";
    }
  }

  function getPublishDate() {
    const currYear = new Date().getFullYear();
    let publishedYear = book.publishedDate;
    const diff = currYear - publishedYear;
    if (diff > 10) publishedYear += " - Vintage";
    else if (diff < 10) publishedYear += " - NEW!";
    return publishedYear;
  }

  function getPageCount() {
    let pageCount = book.pageCount;
    if (book.pageCount > 500) pageCount += " - Long reading";
    else if (book.pageCount > 200) pageCount += " - Decent reading";
    else if (book.pageCount < 100) pageCount += " - Light reading";
    return pageCount;
  }

  function onBookReview(review) {
    bookService
      .addReview(book, review)
      .then((updatedBook) => {
        setBook(updatedBook);
        loadBook();
      })
      .catch((err) => {
        console.log("Error adding review:", err);
      });
  }

  function onDeleteReview(idx) {
    bookService
      .deleteReview(book, idx)
      .then((updatedBook) => {
        setBook(updatedBook);
        loadBook();
      })
      .catch((err) => {
        console.log("Error deleting review:", err);
      });
  }

  function onBack() {
    navigate("/book");
  }

  if (!book) return <div>Loading...</div>;
  const {
    title,
    subtitle,
    thumbnail,
    authors,
    description,
    language,
    categories,
    listPrice,
    reviews,
  } = book;

  return (
    <section className="book-details">
      <div className="actions-btn">
        <button className="go-back-btn" onClick={onBack}>
          ⬅ Go back
        </button>
      </div>

      <div className="book-details-container">
        <div className="book-details-container-img">
          <img src={thumbnail} />
        </div>

        <div className="book-details-info">
          <div className="book-details-container-titles">
            <div className="book-details-title">{title}</div>
          </div>

          <div className="book-details-container-subtitle">
            <div className="book-details-subtitle">{subtitle}</div>
          </div>

          <div className="book-details-container-on-sale">
            {listPrice.isOnSale && (
              <div className="book-details-on-sale span">On-sale!</div>
            )}
          </div>

          <div className="book-details-info-row">
            <span className="book-details-info-title span">Year publish: </span>
            <span className="book-details-info-text">{getPublishDate()}</span>
          </div>

          <div className="book-details-info-row">
            <span className="book-details-info-title span">
              Author{authors.length > 1 ? "s" : ""}:{" "}
            </span>
            <span className="book-details-info-text">{authors.join(", ")}</span>
          </div>

          <div className="book-details-info-row">
            <span className="book-details-info-title span">Language: </span>
            <span className="book-details-info-text">
              {getBookLng(language)}
            </span>
          </div>

          <div className="book-details-info-row">
            <span className="book-details-info-title span">Categories: </span>
            <span className="book-details-info-text">
              {categories.join(", ")}
            </span>
          </div>

          <div className="book-details-info-row">
            <span className="book-details-info-title span">Pages: </span>
            <span className="book-details-info-text">{getPageCount()}</span>
          </div>

          <div className="book-details-info-row">
            <span className="book-details-info-title span">Price: </span>
            <span className={"book-details-info-text "}>
              {listPrice.amount.toLocaleString(undefined, {
                style: "currency",
                currency: listPrice.currencyCode,
              })}
            </span>
          </div>

          <div className="book-details-buy-container">
            <button
              className="buy-book-btn"
              onClick={() => alert(`Have a good reading!`)}
            >
              {" "}
              Buy it now!
            </button>
          </div>
        </div>
      </div>

      <div className="book-details-bottom-container">
        <div className="book-details-info-row-description ">
          <span className="book-details-info-row-description span">Description: </span>
          <span className="book-details-info-row-description-button">
            <LongTxt txt={description} />
          </span>
        </div>

        <div className="book-details-review-container">
          <div className="book-details-review">
            <span className="book-details-review span">Reviews: </span>
            {reviews && reviews.length > 0 ? (
              <ul>
                {reviews.map((review, idx) => (
                  <li key={idx}>
                    <div className="book-details-review-info">
                      <div className="book-details-review-span-info">
                      <span className="book-details-review span">Name:</span>
                      <span>{review.fullname || "No name"}</span>
                      </div>
                      <div className="book-details-review-span-info">
                        <span className="book-details-review span">
                          Rating:
                        </span>
                        <span>{review.rating || "No rating"}</span>
                      </div>
                      <div className="book-details-review-span-info">
                        <span className="book-details-review span">
                          Read at:
                        </span>
                        <span>{review.readAt || "Date not specified"}</span>
                      </div>
                    </div>
                    <div className="book-details-review-info-btn">
                      <button onClick={() => onDeleteReview(idx)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No reviews yet</div>
            )}
          </div>

          <div className="book-details-add-review">
            <AddReview book={book} onBookReview={onBookReview} />
          </div>
        </div>
      </div>

      <section className="book-routing-container">
        <button>
          <Link to={`/book/${book.prevBookId}`}>Prev book</Link>
        </button>
        <button>
          <Link to={`/book/${book.nextBookId}`}>Next book</Link>
        </button>
      </section>
    </section>
  );
}
