import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Session/AuthContext';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const StockPage = () => {
    const [isLoading, setIsLoading] = useState('');
    const [shares, setShares] = useState(0);
    const [costPerShare, setCostperShare] = useState(0);
    const [data, setData] = useState({});
    const { symbol } = useParams();
    const { currentUser, bankInfo, actions } = useAuth();
    const history = useHistory();

    const fetchStockInfo = () => {

        axios.get(`${process.env.REACT_APP_BACKEND_PROXY}/api/live/${symbol}/daily`)
            .then((res) => {
                const data = res.data;
                    setData(data),
                    setShares(1),
                    setCostperShare(data.data["1. open"])
                }).catch((err)=>{
                    console.log(err);
                });

    }
    const logStock = (symbol, lastUpdated, volume, open, high, low, close) => {
        axios.post(`${process.env.REACT_APP_BACKEND_PROXY}/api/stock/`, {
            "symbol": symbol,
            "lastUpdated": lastUpdated,
            "volume": volume,
            "_open": open,
            "_high": high,
            "_low": low,
            "_close": close
        }).then((res) => {
            console.log(res)
        }, (error) => { console.log(error) })

    }
    const makeTransaction = (user, shares, symbol, amount_payed, time) => {

        //user = models.ForeignKey(StockUser,on_delete=models.CASCADE)
        // stock = models.ForeignKey(Stock, on_delete=models.CASCADE, null=True)
        // shares = models.IntegerField(null=True)
        // amount_payed = models.FloatField(null=True)
        // time = models.DateTimeField(blank = True, null = True)
        const { email } = currentUser;
        axios.post(`${process.env.REACT_APP_BACKEND_PROXY}/api/transactions/`, {
            "user": user,
            "stock": symbol,
            "shares": shares,
            "amount_payed": amount_payed,
            "time": time,
        }).then((res) => {
            console.log(res.data)
            actions.getUserInfo(email)
            history.push(ROUTES.ACCOUNT);
        }, (error) => { console.log(error) })
    }

    const onSubmit = event => {
        event.preventDefault();
        //createStock
        const { email } = currentUser;
        console.log(email)
        logStock(
            symbol,
            data.meta_data["3. Last Refreshed"],
            data.data["5. volume"],
            data.data["1. open"],
            data.data["2. high"],
            data.data["3. low"],
            data.data["4. close"]
        )
        const payed = shares * costPerShare;
        makeTransaction(
            email,//user email
            shares,
            symbol,
            payed,
            null
        )
    }

    const handleChange = (event) => {
        event.preventDefault()
        const elementName = event.target.name;
        const elementValue = event.target.value;
        switch(elementName) {
            case 'shares':
                setShares(elementValue);
                break;
            default:
                break;
        }
    };
    
    useEffect(()=>{
        fetchStockInfo()
    },[symbol])

    return (
        <div className={"m-50 trans-card"}>
            <h5 className={"stock-title"}>{localStorage.getItem(symbol)}</h5>
            <div className={"stock-details-section m-left-5"}>
                <div className={"stock-info-section "}>
                    <h6 className="centr"> Symbol : {symbol}</h6>
                    <br />
                    {data.data && (<div className="centr">
                        <p>Open   : ${data.data["1. open"]}</p>
                        <p>Close  : ${data.data["4. close"]}</p>
                        <p>High   : ${data.data["2. high"]}</p>
                        <p>Low    : ${data.data["3. low"]}</p>
                        <p>Volume : {data.data["5. volume"]}</p>
                    </div>
                    )}
                </div>
                <div className={"stock-purchase-or-login"}>
                        {currentUser ? (
                                <div className="form">
                                    <form className={"login-form"} onSubmit={onSubmit}>
                                        <h6 style={{color:"green"}}>Funds avail: ${bankInfo['bank']}</h6>
                                        <h5>${costPerShare * shares}</h5>
                                        <input
                                            name="shares"
                                            value={shares}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="shares"
                                        />
                                        <button className={"btn btn-primary todo-sign-in-btn"} type="submit">
                                            BUY
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                    <Link to={"/signin"}>SIGN IN TO BUY SHARES</Link>
                                )

                        }
                </div>
            </div>
        </div>
    )
}
export default StockPage;