export function RateBySelect({ val, onRatingChange }) {
    return (
      <select value={val} onChange={(e) => onRatingChange(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    )
  }
  
  export function RateByTextbox({ val, onRatingChange }) {
    return (
      <input
        type="number"
        value={val}
        onChange={(e) => onRatingChange(e.target.value)}
        min="1"
        max="5"
      />
    )
  }
  
  export function RateByStars({ val, onRatingChange }) {
    const stars = [1, 2, 3, 4, 5]
    return (
      <div>
        {stars.map((star) => (
          <span
            key={star}
            onClick={() => onRatingChange(star)}
            style={{ cursor: 'pointer', color: star <= val ? 'gold' : 'gray' }}
          >
            ★
          </span>
        ))}
      </div>
    )
  }
  