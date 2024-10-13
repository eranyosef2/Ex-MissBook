export function BookPreview({ book }) {
  const { title, listPrice, thumbnail, authors } = book;
  return (
    <article className="book-card-details">
      <section className="preview-image-container">
        <img src={thumbnail} className="book-card-thumbnail" />
        {listPrice.isOnSale && (
          <div className="book-card-details-on-sale">
            <div className="book-details-on-sale">On sale</div>
          </div>
        )}
      </section>

      <div className="book-card-details-info">
        <div className="book-card-title">{title}</div>
        <span className="book-card-details-info-authors">{authors}</span>
        <div className="book-card-detail-price-info">
          <span className="book-card-details-price">
            {listPrice.amount.toLocaleString(undefined, {
              style: "currency",
              currency: listPrice.currencyCode,
            })}
          </span>
        </div>
      </div>
    </article>
  );
}
