import React, { Component } from 'react';
import axios from 'axios';
import { AuthUserContext } from '../Session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// import sleep from 'sleep';
class StockPage extends Component {
    state = {
        symbol: '',
        loaded: '',
        shares: 0,
        costPershar: 0,
        data: {}
    }
    componentWillMount() {
        const { symbol } = this.props.match.params;
        this.setState({
            symbol: symbol
        })

        if (symbol) {
            this.fetchStockInfo(symbol)

        }

        console.log(this.props)
    }

    onSubmit = event => {
        const { symbol, data, shares, costPershar } = this.state;

        //createStock
        this.logStock(
            symbol,
            data.meta_data["3. Last Refreshed"],
            data.data["5. volume"],
            data.data["1. open"],
            data.data["2. high"],
            data.data["3. low"],
            data.data["4. close"]
        )
        const payed = shares * costPershar;
        const uid = JSON.parse(localStorage.getItem('authUser'))['uid']
        this.makeTransaction(
            uid,
            shares,
            symbol,
            payed,
            null
        )

        this.props.history.push(ROUTES.ACCOUNT);

        // sleep(1000);
        event.preventDefault();

    }

    logStock = (symbol, lastUpdated, volume, open, high, low, close) => {
        axios.post('/api/stock/', {
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

    makeTransaction = (user, shares, symbol, amount_payed, time) => {

        //user = models.ForeignKey(StockUser,on_delete=models.CASCADE)
        // stock = models.ForeignKey(Stock, on_delete=models.CASCADE, null=True)
        // shares = models.IntegerField(null=True)
        // amount_payed = models.FloatField(null=True)
        // time = models.DateTimeField(blank = True, null = True)

        axios.post('/api/transactions/', {
            "user": user,
            "stock": symbol,
            "shares": shares,
            "amount_payed": amount_payed,
            "time": time,
        }).then((res) => {
            console.log(res.data)
            localStorage.setItem('bank', res.data['moneyLeft'])
        }, (error) => { console.log(error) })
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    fetchStockInfo = (symbol) => {

        axios.get(`/api/live/${symbol}/daily`)
            .then(res => {
                const data = res.data
                this.setState({
                    data: data,
                    shares: 1,
                    costPershar: data.data["1. open"]
                })
            })

    }


    render() {
        const { symbol, data, shares, costPershar } = this.state;
        console.log(shares)
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
                        <AuthUserContext.Consumer>
                            {authUser =>
                                authUser ? (
                                    <div className="form">
                                        <form className={"login-form"} onSubmit={this.onSubmit}>
                                            <h5>${costPershar * shares}</h5>
                                            <input
                                                name="shares"
                                                value={shares}
                                                onChange={this.onChange}
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
                        </AuthUserContext.Consumer>
                    </div>
                </div>
            </div>
        )
    }
}

export default StockPage;