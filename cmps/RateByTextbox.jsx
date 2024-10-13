export function RateByTextbox({ val, onSelected }) {
  return (
    <div className="rate-by-textbox">
      <input
        type="number"
        value={val}
        min="1"
        max="5"
        onChange={(e) => onSelected(e.target.value)}
      />
    </div>
  )
}