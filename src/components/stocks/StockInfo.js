import React from 'react'

const StockInfo = ({ stock }) => {
    return (
        <div>
            {stock.key}
            <h1>Stock Ticker: {stock.symbol}</h1>
            <h2>Price at close: ${stock.price}</h2>
            <h3>Volume: {new Intl.NumberFormat().format(parseInt(stock.volume))}</h3>

        </div>
    )
}

export default StockInfo
