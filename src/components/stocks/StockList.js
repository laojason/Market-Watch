import React, { useState, useEffect } from 'react';
import StockInfo from './StockInfo';

const StockList = ({ isLoading, stock, WatchListArray}) => {

    const [StockParsed, setStockParsed] = useState([])


    useEffect(() => {
        if (stock['Global Quote'] !== undefined){
            setStockParsed(prevStock => [...prevStock, {"price": stock['Global Quote']['05. price'], 
                             "symbol": stock['Global Quote']['01. symbol'],
                             "change": stock['Global Quote']['09. change'],
                             "changePercent": stock['Global Quote']['10. change percent']
            }])
        }
    }, [stock])    
    return isLoading ? (<h1> Loading... </h1>) : 
    (
        <div className='container'>
            {StockParsed.map((info) => (
                <StockInfo key={`${info.key}_${info.symbol}`} stock={info} watchListArr={WatchListArray}> </StockInfo>
            ))}
        </div>
    )
}

export default StockList
