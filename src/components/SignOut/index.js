import React from 'react';

import { useAuth } from '../Session/AuthContext';

const SignOutButton = () => {
  const { actions } = useAuth()
  return(
  <button type="button"
    className={"btn btn-primary todo-sign-in-btn"}
    onClick={actions.signOut}>
    SIGN OUT
  </button>
)};

export default SignOutButton;
