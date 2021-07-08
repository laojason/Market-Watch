import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from './components/ui/Header'
import Search from './components/ui/Search'
import StockList from './components/stocks/StockList'
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/App.scss';



const App = () => {

    const [StockData, setStockData] = useState({})
    const [isLoading, setIsLoading] = useState([true])
    const [stock, setStock] = useState('')

    useEffect(() => {
        const fetchStocks = async () => {
            const API_KEY = 'PMGYJIC4VJLKZV72'
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
            <StockList isLoading={isLoading} stock={StockData} />
        </div>

    );
}
 
export default App;
 