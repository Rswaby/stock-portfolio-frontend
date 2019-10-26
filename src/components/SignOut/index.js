import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button"
    className={"btn btn-primary todo-sign-in-btn"}
    onClick={
      firebase.doSignOut
    }>
    SIGN OUT
  </button>
);

export default withFirebase(SignOutButton);
