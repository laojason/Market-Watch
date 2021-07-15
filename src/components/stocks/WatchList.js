import React, { useState, useEffect} from 'react';
import StockInfo from './StockInfo';

const WatchList = ({ isListLoading, StockList, watchListArray }) => {

    const [StockParsed, setStockParsed] = useState([])

    //grabs all info from api call, parsed
    useEffect(() => {
        if (StockList.length === watchListArray.length){
            StockList.forEach(function (stocks) {
                if (stocks['Global Quote'] !== undefined){
                    setStockParsed(prevStock => [...prevStock, {"price": stocks['Global Quote']['05. price'], 
                                     "symbol": stocks['Global Quote']['01. symbol'],
                                     "change": stocks['Global Quote']['09. change'],
                                     "changePercent": stocks['Global Quote']['10. change percent']
                    }])
                }
            });
        }

    }, [StockList, watchListArray])
    
    //delete stock
    const deleteFromWatchList = (ticker) =>{
        setStockParsed(StockParsed.filter((stockItem)=> stockItem.symbol !==ticker ))    
    }

    
    return isListLoading ? (<h1> Loading Watchlist... </h1>) : 
    (
        <div className='container mt-5'>
            {StockParsed.map((info) => (
                <StockInfo key={`${info.key}_${info.symbol}`} stock={info} watchListArr={watchListArray} onDeleteStock={deleteFromWatchList}> </StockInfo>
            ))}
        </div>
    )
}

export default WatchList

