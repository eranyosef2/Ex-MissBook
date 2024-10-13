export function RateBySelect({ val, onSelected }) {
  return (
    <select className="rate-by-select" value={val} onChange={(e) => onSelected(e.target.value)}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  )
}