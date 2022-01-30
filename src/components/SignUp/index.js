import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Session/AuthContext';
import axios from 'axios';
const EMAIL_IN_USE = 'Firebase: Error (auth/email-already-in-use).';
const INVALID_EMAIL = 'Firebase: Error (auth/invalid-email).';
const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [username, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { actions } = useAuth();
  const history = useHistory()

  const handleChange = (event) => {
    const elementName = event.target.name;
    const elementValue = event.target.value;
    switch (elementName) {
      case 'email':
        setEmail(elementValue);
        break;
      case 'passwordOne':
        setPasswordOne(elementValue);
        break;
      case 'passwordTwo':
        setPasswordTwo(elementValue);
        break;
      case 'username':
        setUserName(elementValue);
        break;
      default:
        break;
  }
}
  const createStockUser = (id, userName) => {

    axios.post('/api/users/create/', {
      "userID": id,
      "userName": userName,
      "bank": 50000
    }).then((res) => {
      console.log(res)
    }, (error) => { console.log(error) })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordOne !== passwordTwo){
      setError("passwords do not match");
      return;
    }
    setError('')
    setIsLoading(true);
    actions.signUp(email, passwordOne,username)
    .then((ref) => {
      console.log(ref)
      setIsLoading(true)
      history.push('/')
     })
     .catch((err) => {
       if (err.message === EMAIL_IN_USE){
        setError("Email address already in use!");
       }else if(err.message === INVALID_EMAIL){
         setError("It looks like your Email is invalid!")
       }else{
         setError(err.message);
       }
       setIsLoading(false);
     })
  };

  const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    console.log(error)
  return(
  <div className={"login-page"}>
    <div className={"form"}>
      <h1>SignUp</h1>
      <form className={"register-form"} onSubmit={handleSubmit}>
        <input
          name="username"
          value={username}
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={handleChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  </div>
)};
export default SignUpPage;
