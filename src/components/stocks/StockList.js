import React, { useState, useEffect } from 'react';
import StockInfo from './StockInfo';

const StockList = ({ isLoading, stock }) => {

    const [StockParsed, setStockParsed] = useState([])

    useEffect(() => {
        if (stock['Meta Data'] !== undefined){
            setStockParsed([stock['Time Series (Daily)']['2021-07-06']['1. open']])
        }
    }, [stock])    
    return isLoading ? (<h1> Loading... </h1>) : 
    (
        <div>
            {StockParsed.map((info) => (
                <StockInfo key = {info} stock={info}> </StockInfo>
            ))}
        </div>
    )
}

export default StockList
