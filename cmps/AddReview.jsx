const { useState } = React

export function AddReview({book, onBookReview}) {
const [review, setReviewToAdd] = useState({
    fullname: '',
    rating: '',
    readAt: ''
})

function handleChange({ target }) {
    const field = target.name
    let value = target.value
    switch (target.type) {
        case 'number':
        case 'range':
            value = +value
            break;

        case 'checkbox':
            value = target.checked
            break
    }

    setReviewToAdd(prevFilter => ({ ...prevFilter, [field]: value }))
}

function addBookReview(ev){
    ev.preventDefault()
    onBookReview(review)
}

  return (
    <section className='book-review'>
      <div className="book-review-title">Reviews</div>
      <form onSubmit={addBookReview}>
        <div className='form-review'>
          <label htmlFor='fullname'>Full Name</label>
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
          <label htmlFor='reatAt'>Read at </label>
          <input
            onChange={handleChange}
            required
            type='date'
            name='readAt'
            id='readAt'
          />
        </div>
        <button type='submit'>Add Review</button>
      </form>
    </section>
  )
}