import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

function AdminRoute(props) {
  const { isAuthenticated, tokenPayload } = useContext(AuthContext);
  const isAdmin = isAuthenticated && tokenPayload.roles.includes('ADMIN');

  return (
    <>
      {isAdmin ? props.children : <h1>Not authorized</h1>}
    </>
  );
}

export default AdminRoute;
