import React from 'react'
import axios from 'axios'


const CryptoInfo = ({ crypto, CryptoListArr, onDeleteCrypto }) => {

    //delete from api mongo db
    const onDelete = async () => {
        console.log(crypto.symbol)
        onDeleteCrypto(crypto.symbol)
        const index = CryptoListArr.indexOf(crypto.symbol);
        if (index > -1) {
            CryptoListArr.splice(index, 1);
        }
        const CryptoListUpdate = { cryptoList: CryptoListArr}
        await axios.patch('http://localhost:4000/users/jlao', CryptoListUpdate)
    }

    return (
        <div>
            <ul className='w3-ul w3-card-4 center-card'>
                <li className='w3-bar'>
                    <div className='row'>
                        <div className='col-4'>
                            <h4>
                                <button type="button" className="close" aria-label="Close" onClick={()=>onDelete()}>
                                    <span aria-hidden="true">&times;&nbsp;</span>
                                </button>  
                                {crypto.symbol}                          
                            </h4>
                        </div>
                        <div className='col-8'>
                            <h4 className='w3-xlarge w3-right'>{parseFloat(crypto.price).toFixed(4)}</h4>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-lg-10 col-sm-8 col-8'>
                            <h5>{crypto.name}</h5>
                        </div>
                        {/* <div className='col-lg-1 col-sm-2 col-2'>
                            <h5 className={`w3-xlarge w3-right ${parseFloat(stock.changePercent) >= 0 ? 'text-success' : 'text-danger'}`}>
                                <i className={`inline-icon ${parseFloat(stock.changePercent) >= 0 ? 'fa fa-angle-up' : 'fa fa-angle-down'}`}></i>
                                &nbsp;
                                {Math.abs(parseFloat(stock.changePercent).toFixed(2))}%
                            </h5>
                        </div>
                        <div className='col-lg-1 col-sm-2 col-2'>
                            <h5 className={`w3-xlarge w3-right ${parseFloat(stock.change) >= 0 ? 'text-success' : 'text-danger'}`}>
                                {parseFloat(stock.change).toFixed(2)}
                                </h5>
                        </div> */}
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default CryptoInfo
