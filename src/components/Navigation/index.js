import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const style = {
  link: {
    "textDecoration": "none",
    "color": "white",
    "textAlign": "center",
  }
}
const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
          <NavigationNonAuth />
        )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <div className={" blue-bar navbar navbar-default navbar-light justify-content-end"}>
    <div id={"nav-bar-item"}>
      <Link style={style.link} to={ROUTES.HOME}>HOME</Link>
    </div>
    <div id={"nav-bar-item"}>
      <Link style={style.link} to={ROUTES.LANDING}>BROWSE</Link>
    </div>
    <div id={"nav-bar-item"}>
      <Link style={style.link} to={ROUTES.ACCOUNT}>PORTFOLIO</Link>
    </div>
    {!!authUser.roles[ROLES.ADMIN] && (
      <div id={"nav-bar-item"}>
        <Link style={style.link} to={ROUTES.ADMIN}>ADMIN</Link>
      </div>
    )}
    <div id={"nav-bar-item"} onClick={()=>{localStorage.setItem('bank','')}}>
      <SignOutButton />
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <nav className={"blue-bar navbar navbar-default navbar-light justify-content-end"}>
    <div id={"nav-bar-item"} className={"nav-item"}>
      <Link style={style.link} to={ROUTES.LANDING}>LANDING</Link>
    </div>
    <div id={"nav-bar-item"} className={"nav-item"}>
      <Link style={style.link} to={ROUTES.SIGN_IN}>SIGN IN</Link>
    </div>
  </nav>
);

export default Navigation;
