import React, { useState} from 'react'

const Search = ({ getStock }) => {
    const [text, setText] = useState('')

    const onTextChange = (v) => {
        setText(v)
    }

    const onSearch = () => {
        getStock(text)
    }
    return (
        <section className='Search'>
            <form>
                <input type='text' className='form-control' placeholder='Search' autoFocus value={text} onChange={(e) => onTextChange(e.target.value)}/>
                <input type ="button" value="Search" onClick={()=>onSearch()}/>
            </form>
        </section>
    )
}

export default Search
