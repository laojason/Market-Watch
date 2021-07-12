import React, { useState, useEffect} from 'react';
import StockInfo from './StockInfo';

const WatchList = ({ isListLoading, StockList, NumberOfStocks }) => {

    const [StockParsed, setStockParsed] = useState([])

    useEffect(() => {
        if (StockList.length === NumberOfStocks){
            StockList.forEach(function (stocks) {
                if (stocks['Meta Data'] !== undefined){
                    setStockParsed(prevStock => [...prevStock, {"price": stocks['Time Series (Daily)'][stocks['Meta Data']['3. Last Refreshed']]['4. close'], 
                                     "symbol": stocks['Meta Data']['2. Symbol'],
                                     "volume": stocks['Time Series (Daily)'][stocks['Meta Data']['3. Last Refreshed']]['6. volume']
                    }])
                }
            });
        }

    }, [StockList, NumberOfStocks])    
    return isListLoading ? (<h1> Loading Watchlist... </h1>) : 
    (
        <div>
            {StockParsed.map((info) => (
                <StockInfo key={`${info.key}_${info.symbol}`} stock={info}> </StockInfo>
            ))}
        </div>
    )
}

export default WatchList

