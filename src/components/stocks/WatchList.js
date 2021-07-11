import React, { useState, useEffect} from 'react';
import StockInfo from './StockInfo';

const WatchList = ({ isListLoading, StockList }) => {

    const [StockParsed, setStockParsed] = useState([])
    console.log('my watch list is ')
    console.log(StockList)

    useEffect(() => {
        setStockParsed(StockList)
        for (let stocks in StockList){
            console.log('my watch list is in loop is  ')

            console.log(stocks)
            // if (stock['Meta Data'] !== undefined){
            //     setStockParsed([{"price": stock['Time Series (Daily)'][stock['Meta Data']['3. Last Refreshed']]['4. close'], 
            //                      "symbol": stock['Meta Data']['2. Symbol'],
            //                      "volume": stock['Time Series (Daily)'][stock['Meta Data']['3. Last Refreshed']]['6. volume']
            //     }])
            // }
        }

    }, [StockList])    
    return isListLoading ? (<h1> Loading... </h1>) : 
    (
        <div>
            {StockParsed.map((info) => (
                <StockInfo key={`${info.key}_${info.symbol}`} stock={info}> </StockInfo>
            ))}
        </div>
    )
}

export default WatchList

