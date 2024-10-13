import { RateBySelect } from "../cmps/RateBySelect.jsx";
import { RateByStars } from "../cmps/RateByStars.jsx";
import { RateByTextbox } from "../cmps/RateByTextbox.jsx";

const { useState } = React;

export function AddReview({ onBookReview }) {
  const [ratingMethod, setRatingMethod] = useState("stars");
  const [rating, setRating] = useState(3);
  const [review, setReviewToAdd] = useState({
    fullname: "",
    rating: "",
    readAt: "",
  });

  function handleRatingChange(newRating) {
    setRating(newRating)
    setReviewToAdd((prevReview) => ({ ...prevReview, rating: newRating }))
  }

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;
    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;

      case "checkbox":
        value = target.checked;
        break;
    }

    setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }));
  }

  function addBookReview(ev) {
    ev.preventDefault();
    onBookReview(review);
  }

  return (
    <section className="book-review">
      <div className="book-review-title">Reviews</div>
      <form onSubmit={addBookReview}>
        <div className="form-review">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            required
            placeholder="Full Name"
            onChange={handleChange}
            value={review.fullname}
          />
        </div>

        <div className="form-review-rating">

        <div className="form-review-rating-option">
          <input
            type="radio"
            name="ratingMethod"
            value="stars"
            checked={ratingMethod === "stars"}
            onChange={(e) => setRatingMethod(e.target.value)}
          /> Rate by Stars
        </div>

        <div className="form-review-rating-option">
          <input
            type="radio"
            name="ratingMethod"
            value="select"
            checked={ratingMethod === "select"}
            onChange={(e) => setRatingMethod(e.target.value)}
          />Rate by Select
        </div>

        <div className="form-review-rating-option">
          <input
            type="radio"
            name="ratingMethod"
            value="textbox"
            checked={ratingMethod === "textbox"}
            onChange={(e) => setRatingMethod(e.target.value)}
          />Rate by Textbox
        </div>

          {ratingMethod === "stars" && (
            <RateByStars val={rating} onSelected={handleRatingChange} />
          )}
          {ratingMethod === "select" && (
            <RateBySelect val={rating} onSelected={handleRatingChange} />
          )}
          {ratingMethod === "textbox" && (
            <RateByTextbox val={rating} onSelected={handleRatingChange} />
          )}

        </div>

        <div className="form-review">
          <label htmlFor="reatAt">Read at </label>
          <input
            onChange={handleChange}
            required
            type="date"
            name="readAt"
            id="readAt"
          />
        </div>

        <button type="submit">Add Review</button>
      </form>

    </section>
  );
}
