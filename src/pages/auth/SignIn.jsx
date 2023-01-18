import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

export default function SignIn() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login" style={{ display: "flex", justifyContent: "center", alignItems: "center",height:"100vh"}}>
      <div className="container">
        <button style={{ cursor: "pointer" }} onClick={() => loginWithRedirect()}>
          <span>Iniciar Sesion</span>
          <div className="liquid"></div>
        </button>
      </div>
    </div>


  )
}
