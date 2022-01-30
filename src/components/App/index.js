import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import StockPage from '../StockPage';
import * as ROUTES from '../../constants/routes';
import { AuthProvider } from '../Session/AuthContext';
// import { withAuthentication } from '../Session';

const App = () => (
  <AuthProvider>
    <Router>
        <Navigation />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.STOCKDETAILS} component={StockPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    </Router>
  </AuthProvider>
);

export default App;
