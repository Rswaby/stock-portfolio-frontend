import React, { Component, useEffect, useState  } from 'react';
import axios from 'axios';
import { useAuth  } from '../Session/AuthContext';


const AccountPage = () => {
  const { currentUser, bankInfo, actions } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [transData, setTransData] = useState([]);
  
  const getTransInfo = () => {
    setIsLoading(true)
    axios.get(`${process.env.REACT_APP_BACKEND_PROXY}/api/transactions/${currentUser.email}`)
        .then(res => {
            const data = res.data
            setTransData(data);
            setIsLoading(false)
        }).catch((err)=>{
          setIsLoading(false)
        });
  }

  useEffect(()=>{
    getTransInfo();
    actions.getUserInfo(currentUser.email)
  },[currentUser]);
  return(
      <div className={"porfolio-area"}>
        {/* <Porfolio/> */}
        {/* <PasswordForgetForm />   */}
        {/* <PasswordChangeForm /> */}
        {/* <LoginManagement authUser={authUser} /> */}
        <div className="porfolio-detials">
                <div className="porfolio-rows">
                    <h5 className="centr m-top-5">
                        Transaction History
                    </h5>
                    {!isLoading && transData? transData.map((transac,index) =>
                        <div key={`${index}-${transac.stock}`} className="trans-card">
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
                    <h5 className="centr m-top-5"> Porfolio </h5>
                    <h6 className="centr"><span style={{color:"green"}}> Funds available: ${bankInfo['bank']}</span></h6>
                </div>
            </div>
      </div>
    )};
export default AccountPage
