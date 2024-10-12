
export function BookPreview({ book }) {

    const { title, listPrice, thumbnail, authors } = book
    return (
        <article>
            <div className="book-card-select-book" >
                <div className="book-card-title">{title}</div>
                <section className="preview-image-container">
                    {listPrice.isOnSale && <div className="book-details-on-sale">On-sale!</div>}
                    <img src={thumbnail} className="book-card-thumbnail" />
                </section>
            </div>

            <div className="book-card-details">
                <div className="book-card-detail">
                    <span className="book-card-details-title">Author:</span>
                    <span className="book-card-details-info">{authors}</span>
                </div>

                <div className="book-card-detail">
                    <span className="book-card-details-title">Price:</span>
                    <span className="book-card-details-info">{(listPrice.amount).toLocaleString(
                        undefined, { style: 'currency', currency: listPrice.currencyCode }
                    )}</span>
                </div>
            </div>
        </article>
    )
}