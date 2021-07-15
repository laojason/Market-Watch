import React, { } from 'react'
import axios from 'axios'
import './Search.css'
import SelectSearch from 'react-select-search';
import fuzzySearch from '../stocks/fuzzySearch'


const Search = ({ getStock, watchListArray }) => {
    // const [text, setText] = useState('testing')

    // const onTextChange = (v) => {
    //     setText(v)
    //     console.log(v)
    // }
    
    //when a stock ticker is selected, it'll add the stock to the watch list
    const onStockSelect = async (e) => {
        getStock(e)
        watchListArray.push(e)
        const watchListUpdate = { watchList: watchListArray}
        await axios.patch('http://localhost:4000/users/jlao', watchListUpdate)
    }

    //function to get the list of options to display on the search bar upon user input
    function getOptions(query) {
        return new Promise((resolve, reject) => {
            const API_KEY = 'O7K982YJCI1VNZZ0'
            const optionHolder = []
            fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`)
                .then(response => response.json())
                .then(({ bestMatches }) => {
                    for (let key in bestMatches){
                        if (bestMatches[key]['4. region'] === 'United States'){
                            optionHolder.push({value: bestMatches[key]['1. symbol'], name: bestMatches[key]['2. name']})
                        }
                    }
                    resolve(optionHolder)

                })
                .catch(reject);
        });
    }
    
    return (
        <div className='col-12'>
                {/* <input type='text' className='form-control' placeholder='Search' autoFocus value={text} onChange={(e) => onTextChange(e.target.value)}/>
                <button className='AddBtn' value="Search" onClick={()=>onSearch()}>Add to watchlist</button>  */}
                <SelectSearch
                    options={[]}
                    getOptions={getOptions}
                    onChange={onStockSelect}
                    search
                    filterOptions={fuzzySearch}
                    emptyMessage="Not found"
                    placeholder="Search Market"
                    autoFocus
                />
        </div>
    )
}

export default Search
