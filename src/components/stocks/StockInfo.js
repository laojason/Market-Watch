import React from 'react'
import axios from 'axios'


const StockInfo = ({ stock, watchListArr }) => {


    const onDelete = async () => {
        const index = watchListArr.indexOf(stock.symbol);
        if (index > -1) {
            watchListArr.splice(index, 1);
        }
        const watchListUpdate = { watchList: watchListArr}
        await axios.patch('http://localhost:4000/users/jlao', watchListUpdate)
    }

    return (
        <div>
            
            {stock.key}
            <h1>Stock Ticker: {stock.symbol}</h1>
            <h2>Price at close: ${parseFloat(stock.price).toFixed(2)}</h2>
            <h2>Price Change: ${parseFloat(stock.change).toFixed(2)}</h2>
            <h2>Percent Change: {parseFloat(stock.changePercent).toFixed(2)}</h2>
            <input type ="button" value="Remove" onClick={()=>onDelete()}/>

            {/* <h3>Volume: {new Intl.NumberFormat().format(parseInt(stock.volume))}</h3> */}

        </div>
    )
}

export default StockInfo
