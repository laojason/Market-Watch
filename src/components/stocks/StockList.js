import React, { useState, useEffect } from 'react';
import StockInfo from './StockInfo';

const StockList = ({ isLoading, stock }) => {

    const [StockParsed, setStockParsed] = useState([])


    useEffect(() => {
        if (stock['Meta Data'] !== undefined){
            setStockParsed([{"price": stock['Time Series (Daily)'][stock['Meta Data']['3. Last Refreshed']]['4. close'], 
                             "symbol": stock['Meta Data']['2. Symbol'],
                             "volume": stock['Time Series (Daily)'][stock['Meta Data']['3. Last Refreshed']]['6. volume']
            }])
        }
    }, [stock])    
    return isLoading ? (<h1> Loading... </h1>) : 
    (
        <div>
            {StockParsed.map((info) => (
                <StockInfo key={`${info.key}_${info.symbol}`} stock={info}> </StockInfo>
            ))}
        </div>
    )
}

export default StockList
