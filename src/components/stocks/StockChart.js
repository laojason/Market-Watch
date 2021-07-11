import React, { useState, useEffect }from 'react'
import Plot from 'react-plotly.js';

const StockChart = ({ isLoading, stock, text }) => {
    const [StockX, setStockX] = useState([])
    const [StockY, setStockY] = useState([])

    useEffect(() => {
        let stockXValues = []
        let stockYValues = []
        for (let key in stock['Time Series (Daily)']){
            stockXValues.push(key);
            stockYValues.push(stock['Time Series (Daily)'][key]['1. open'])
        }
        setStockX(stockXValues)
        setStockY(stockYValues)

    }, [stock])    
    return isLoading ? (<h1> Loading... </h1>) : 
    (
        <div>
            <Plot
                data={[
                    {
                        x: StockX,
                        y: StockY,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'}
                    }
                ]}
                layout={{width: 720, height: 500, title: 'Stock History'}}
            
            />

        </div>
    )
}

export default StockChart
