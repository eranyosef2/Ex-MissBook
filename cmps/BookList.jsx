import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSelectBookId }) {
    
    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id} className="book-list-book">
                    <BookPreview book={book}/>
                    <section>
                        <button onClick={() => onSelectBookId(book.id)}>Select</button>
                        <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                    </section>
                </li>
            )}
        </ul>
    )

}