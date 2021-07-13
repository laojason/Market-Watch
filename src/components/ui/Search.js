import React, { useState} from 'react'
import axios from 'axios'

const Search = ({ getStock, watchListArray }) => {
    const [text, setText] = useState('')

    const onTextChange = (v) => {
        setText(v)
    }

    const onSearch = async () => {
        getStock(text)
        watchListArray.push(text)
        const watchListUpdate = { watchList: watchListArray}
        await axios.patch('http://localhost:4000/users/jlao', watchListUpdate)
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
