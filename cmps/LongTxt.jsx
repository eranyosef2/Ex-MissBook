const { useState } = React

export function LongTxt({ txt, length = 100 }) {

    const [isShowFullTxt, setIsShowFullTxt] = useState(false)

    function onToggleIsShowFullTxt() {
        setIsShowFullTxt(isShowFullTxt => !isShowFullTxt)
    }

    const isLongText = txt.length > length
    const textToShow = (isShowFullTxt || !isLongText) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section className="long-txt">
            <h4>
                {textToShow}
                {isLongText &&
                    <p>
                        <button onClick={onToggleIsShowFullTxt}>
                            {isShowFullTxt ? ' Less' : ' More...'}
                        </button>
                    </p>
                }
            </h4>
        </section>
    );
}