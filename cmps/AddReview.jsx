const { useState } = React

export function AddReview({ book, onBookReview }) {
    const [review, setReview] = useState({
      fullname: "",
      rating: "",
      readAt: "",
    })
    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // value += ','
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onAddReview(ev) {
    ev.preventDefault()
    onBookReview(review)
  }
  return (
    <section className='book-review'>
      <h2>Reviews</h2>
      <form onSubmit={onAddReview}>
        <div className='form-review'>
          <label htmlFor='fullname'>Full Name </label>
          <input
            type='text'
            name='fullname'
            id='fullname'
            required
            placeholder='Full Name'
            onChange={handleChange}
            value={review.fullname}
          />
        </div>
        <div className='form-review'>
          <label htmlFor='rating'>Rate </label>
          <select
            name='rating'
            id='rating'
            required
            onChange={handleChange}
            value={review.rating}

          >
            <option value="">Choose Rating</option>
            <option value="⭐">⭐</option>
            <option value="⭐⭐">⭐⭐</option>
            <option value="⭐⭐⭐">⭐⭐⭐</option>
            <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
            <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
          </select>
        </div>
        <div className='form-review'>
          <label htmlFor='readAt'>Read at </label>
          <input
            onChange={handleChange}
            required
            type='date'
            name='readAt'
            id='readAt'
            value={review.readAt}
          />
        </div>
        <button type='submit'>Add Review</button>
      </form>
    </section>
  )
}