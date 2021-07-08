import React, { useState} from 'react'

const Search = ({ getStock }) => {
    const [text, setText] = useState('')

    const onSearch = (v) => {
        setText(v)
        getStock(v)
    }
    return (
        <section className='Search'>
            <form>
                <input type='text' className='form-control' placeholder='Search' autoFocus value={text} onChange={(e) => onSearch(e.target.value)}/>
            </form>
        </section>
    )
}

export default Search
