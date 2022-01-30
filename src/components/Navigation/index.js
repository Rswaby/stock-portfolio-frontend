import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { useAuth } from '../Session/AuthContext';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const style = {
  link: {
    "textDecoration": "none",
    "color": "white",
    "textAlign": "center",
  }
}

const Navigation = () =>{
  const { currentUser } = useAuth()
  return (
  <>
    { currentUser ? <NavigationAuth authUser={currentUser} /> : <NavigationNonAuth /> }
  </>
)};

const NavigationAuth = () => (
  <div className={" blue-bar navbar navbar-default navbar-light justify-content-end"}>
    <div id={"nav-bar-item"}>
      <Link style={style.link} to={ROUTES.LANDING}>BROWSE STOCKS</Link>
    </div>
    <div id={"nav-bar-item"}>
      <Link style={style.link} to={ROUTES.ACCOUNT}>ACCOUNT</Link>
    </div>
    <div id={"nav-bar-item"}>
      <SignOutButton />
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <nav className={"blue-bar navbar navbar-default navbar-light justify-content-end"}>
    <div id={"nav-bar-item"} className={"nav-item"}>
      <Link style={style.link} to={ROUTES.LANDING}>BROWSE STOCKS</Link>
    </div>
    <div id={"nav-bar-item"} className={"nav-item"}>
      <Link style={style.link} to={ROUTES.SIGN_IN}>SIGN IN</Link>
    </div>
  </nav>
);

export default Navigation;
