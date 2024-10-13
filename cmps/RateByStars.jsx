export function RateByStars({ val, onSelected }) {
    return (
      <div className="rate-by-stars">
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            style={{ color: num <= val ? 'gold' : 'gray' }}
            onClick={() => onSelected(num)}
          >
            ★
          </span>
        ))}
      </div>
    )
  }