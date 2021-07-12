import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from './components/ui/Header'
import Search from './components/ui/Search'
import StockList from './components/stocks/StockList'
import StockChart from './components/stocks/StockChart'
import WatchList from './components/stocks/WatchList'
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/App.scss';



const App = () => {

    const [StockData, setStockData] = useState({})
    const [StockWatchList, setStockWatchList] = useState([])
    const [NumberOfStocks, setNumberOfStocks] = useState(0)

    const [isLoading, setIsLoading] = useState([true])
    const [isListLoading, setisListLoading] = useState([true])
    const [stock, setStock] = useState('')

    useEffect(() => {
        const fetchWatchList = async () => {
            const result = await axios('http://localhost:4000/api/users')            
            for (let key in result.data[0]){
                if (key === 'watchList'){
                    result.data[0][key].forEach(async item => {
                        const API_KEY = 'O7K982YJCI1VNZZ0'
                        const stocks = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${item}&apikey=${API_KEY}`)
                        setStockWatchList(prevStock  => [...prevStock, stocks.data])        
                        }
                    )                 
                }
            }
            setNumberOfStocks(result.data[0]['watchList'].length)
            setisListLoading(false)

        }
        fetchWatchList()
    }, [])

    useEffect(() => {
        const fetchStocks = async () => {
            const API_KEY = 'O7K982YJCI1VNZZ0'
            const result = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&apikey=${API_KEY}`)            
            setStockData(result.data)
            setIsLoading(false)
        }
        fetchStocks()
    }, [stock])

    return (
        <div className="stock-app">
            <Header/>
            <Search getStock={(v) => setStock(v)}/>
            <WatchList isListLoading={isListLoading} StockList={StockWatchList} NumberOfStocks={NumberOfStocks}/>
            <StockList isLoading={isLoading} stock={StockData} />
            <StockChart isLoading={isLoading} stock={StockData} />
        </div>

    );
}
 
export default App;
 