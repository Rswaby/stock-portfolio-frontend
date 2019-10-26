import React, { Component } from 'react';
import axios from 'axios';

class Porfolio extends Component {

    state = {
        transInfoLoaded: false,
        transInfoLoading: false,
        transData: []
    }

    componentWillMount() {
        const uid = JSON.parse(localStorage.getItem('authUser'))['uid']
        console.log(uid)
        this.getUserInfo(uid)
        this.getTransInfo(uid)



    }
    getTransInfo = (userID) => {

        axios.get(`/api/transactions/${userID}`)
            .then(res => {
                const data = res.data
                this.setState({
                    transInfoLoaded: true,
                    transInfoLoading: false,
                    transData: data
                })
            })

    }
    getUserInfo = (userID) => {
        axios.get(`/api/users/${userID}`)
            .then(res => {
                const data = res.data
                localStorage.setItem('bank', data['bank'])
            })
    }

    render() {
        console.log(this.state.transData)
        const { transInfoLoaded, transData } = this.state
        return (
            <div className="porfolio-detials">
                <div className="porfolio-rows">
                    <h5 className="centr m-top-5">Transaction History</h5>
                    {transInfoLoaded ? transData.map((transac) =>
                        <div className="trans-card">
                            <h5>{transac.stock}</h5>
                            <p>shares owned: {transac.shares}</p>
                            <p>Total Price: ${transac.amount_payed}</p>
                        </div>
                    ) :
                        (
                            <div className={"lds-circle centr"}><div></div></div>
                        )
                    }
                </div>
                <div>
                    <h5 className="centr m-top-5">Porfolio</h5>
                </div>
            </div>
        )
    }
}


export default Porfolio