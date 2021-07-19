import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from './components/ui/Header'
import Search from './components/ui/Search'
// import StockList from './components/stocks/StockList'
// import StockChart from './components/stocks/StockChart'
import WatchList from './components/stocks/WatchList'
import CryptoList from './components/cryptos/CryptoList'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import Home from './components/pages/Home'

import 'bootstrap/dist/css/bootstrap.min.css'
import './scss/App.scss'



const App = () => {

    //holds stock data history
    // const [StockData, setStockData] = useState([])
    const [CryptoListArray, setCryptoListArray] = useState([])
    //holds watchlist stock info from db
    const [StockWatchList, setStockWatchList] = useState([])
    const [CryptoWatchList, setCryptoWatchList] = useState([])

    //the watchlist array from db
    const [WatchListArray, setWatchListArray] = useState([])

    //search display if clicked
    const [SearchClick, setSearchClick] = useState(false)

    // const [isLoading, setIsLoading] = useState([true])
    const [isListLoading, setisListLoading] = useState([true])
    //holds stock data to be processed into plot
    const [stock, setStock] = useState('')
    const API_KEY = 'O7K982YJCI1VNZZ0'

    //gets daily stock update on individual stocks
    useEffect(() => {
        const fetchWatchList = async () => {
            setStockWatchList([])
            setCryptoWatchList([])
            const result = await axios('http://localhost:4000/users/jlao')
            for (let key in result.data){
                if (key === 'watchList'){
                    setWatchListArray(result.data[key])
                    result.data[key].forEach(async item => {
                        const stocks = await axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item}&apikey=${API_KEY}`)
                        setStockWatchList(prevStock  => [...prevStock, stocks.data])
                        }
                    )
                }
                if (key === 'cryptoList'){
                    console.log(result.data[key])
                    setCryptoListArray(result.data[key])
                    result.data[key].forEach(async item => {
                        const crypto = await axios(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${item}&to_currency=USD&apikey=${API_KEY}`)
                        setCryptoWatchList(prevCrypto  => [...prevCrypto, crypto.data])
                        }
                    )
                }
            }
            setisListLoading(false)

        }
        fetchWatchList()
    }, [stock])

    //grabs historical markers of each stock
    // useEffect(() => {
    //     const fetchStocks = async () => {
    //         const result = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&apikey=${API_KEY}`)
    //         setStockData(result.data)
    //         setIsLoading(false)
    //     }
    //     fetchStocks()
    // }, [stock])

    // useEffect(() => {
    //     const fetchCrypto = async () => {
    //         const result = await axios(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${query}&to_currency=CNY&apikey=${API_KEY}`)
    //         setCrypto(result.data)
    //         setIsLoading(false)
    //     }
    //     fetchCrypto()
    // }, [])

    //get individual stock upon search
    // useEffect(() => {
    //     const fetchStock = async () => {
    //         const API_KEY = 'O7K982YJCI1VNZZ0'
    //         const result = await axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_KEY}`)
    //         setStockData(result.data)
    //         setIsLoading(false)
    //     }
    //     fetchStock()
    // }, [stock])

    return (
        <div className="overflow-auto">
            <div className="mb-5">
                <Router>
                    <Header getSearch={(value) => setSearchClick(value)} SearchValue={SearchClick}/>
                    <Switch>
                        <Route path='/' exact render={(props) => (
                            <>
                                {SearchClick && <Search getStock={(v) => setStock(v)} watchListArray={WatchListArray}/>}
                                <WatchList isListLoading={isListLoading} StockList={StockWatchList} watchListArray={WatchListArray}/>
                                {/* <StockList isLoading={isLoading} stock={StockData} watchListArray={WatchListArray} /> */}
                                {/* <StockChart isLoading={isLoading} stock={StockData} /> */}
                            </>
                        )} />
                        <Route path='/Crypto' exact render={(props) => (
                            <>
                                <CryptoList isListLoading={isListLoading} CryptoList={CryptoWatchList} CryptoListArray={CryptoListArray}/>
                            </>
                        )} />
                    </Switch>
                </Router>
            </div>
        </div>

    );
}

export default App;
