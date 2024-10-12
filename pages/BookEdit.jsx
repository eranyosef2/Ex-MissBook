const { useState } = React


export function BookEdit({ book, onUpdate, onCancelEdit }) {

    const [bookToEdit, setBookToEdit] = useState({ ...book })

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function handleListPriceChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...book.listPrice, [field]: value } }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        onUpdate(bookToEdit)
    }


    return (
        <section className='book-edit'>
            <h2 className='edit-book-header'>Edit Book</h2>
            <form onSubmit={onSaveBook}>
                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Title:</label>
                    <input
                        type='text'
                        placeholder='Enter New Title'
                        name='title'
                        value={bookToEdit.title}
                        onChange={handleChange}
                    />
                </div>

                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Description:</label>
                    <textarea
                        type='text'
                        placeholder='Enter New Title'
                        name='description'
                        value={bookToEdit.description}
                        onChange={handleChange}
                    />
                </div>

                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Price:</label>
                    <input
                        type='number'
                        placeholder='Set Price'
                        name='amount'
                        onChange={handleListPriceChange}
                        value={bookToEdit.listPrice.amount}
                    />
                </div>

                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>On Sale:</label>
                    <input
                        type='checkbox'
                        placeholder='Set Price'
                        name='isOnSale'
                        onChange={handleListPriceChange}
                        checked={bookToEdit.listPrice.isOnSale}
                    />
                </div>

                <div className='book-edit-actions-container'>
                    <button className='save-edit-btn' >
                        Save ✔
                    </button>
                    <button
                        type='button'
                        className='cancel-edit-btn'
                        onClick={onCancelEdit}
                    >
                        Cancel ✖
                    </button>
                </div>

            </form>
        </section>
    )
}
