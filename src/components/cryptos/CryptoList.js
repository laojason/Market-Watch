import React, { useState, useEffect} from 'react';
import CryptoInfo from './CryptoInfo';


const CryptoList = ({ isListLoading, CryptoList, CryptoListArray }) => {

    const [CryptoParsed, setCryptoParsed] = useState([])

    //grabs all info from api call, parsed
    useEffect(() => {
        if(CryptoList.length === 0){
            setCryptoParsed([])    
        }

        if (CryptoList.length === CryptoListArray.length){
            CryptoList.forEach(function (cryptos) {
                if (cryptos['Realtime Currency Exchange Rate'] !== undefined){
                    setCryptoParsed(prevCrypto => [...prevCrypto, {"price": cryptos['Realtime Currency Exchange Rate']['8. Bid Price'], 
                                     "symbol": cryptos['Realtime Currency Exchange Rate']['1. From_Currency Code'],
                                     "name": cryptos['Realtime Currency Exchange Rate']['2. From_Currency Name']
                    }])
                }
            });
        }

    }, [CryptoList, CryptoListArray])
    
    //delete stock
    const deleteFromCryptoList = (ticker) =>{
        setCryptoParsed(CryptoParsed.filter((cryptoItem)=> cryptoItem.symbol !==ticker ))    
    }

    
    return isListLoading ? (<h1> Loading crypto list... </h1>) : 
    (
        <div className='container mt-5'>
            {CryptoParsed.map((info) => (
                <CryptoInfo key={`${info.key}_${info.symbol}`} crypto={info} CryptoListArr={CryptoListArray} onDeleteCrypto={deleteFromCryptoList}> </CryptoInfo>
            ))}
        </div>
    )
}

export default CryptoList

