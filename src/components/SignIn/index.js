import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../Session/AuthContext';
import * as ROUTES from '../../constants/routes';
import { PasswordForgetLink } from '../PasswordForget';
const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  const { actions } = useAuth()
  const history = useHistory()
  const handleChange = (event) => {
    const elementName = event.target.name;
    const elementValue = event.target.value;
    switch (elementName) {
      case 'email':
        setEmail(elementValue);
        break;
      case 'password':
        setPassword(elementValue);
        break;  
      default:
        break;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError('')
    setIsLoading(true);
    actions.signIn(email, password)
    .then((ref) => {
      setIsLoading(true)
      history.push('/')
     })
     .catch((err) => {
       setError(err.message);
       setIsLoading(false);
     })
  };
  const isInvalid = password === '' || email === '';
  return (
    <div className={"login-page"}>
      <div className={"form"}>
        <h1>SignIn</h1>
          <form className={"login-form"} onSubmit={handleSubmit}>
            <input
              name="email"
              value={email}
              onChange={handleChange}
              type="text"
              placeholder="Email Address"
            />
            <input
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
            <button className={"btn btn-primary todo-sign-in-btn"} disabled={isInvalid} type="submit">
              SIGN IN
            </button>
          {error && <p>{"Email or Password is Incorrect"}</p>}
        </form>
        <PasswordForgetLink />
        <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </p>
      </div>
    </div>
)};
export default SignInPage;


