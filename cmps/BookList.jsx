import { BookPreview } from "./BookPreview.jsx";

const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {

    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id} className="book-list-book">
                    <BookPreview book={book}/>
                    <section className="book-list-book-btns">
                        <button ><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button ><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                        <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                    </section>
                </li>
            )}
        </ul>
    )

}