import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

export default function SignIn() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

      <div className="card">
        <div style={{textAlign:"center"}}>
          <h3>Tita Media</h3>
        </div>
        <div className="container">
          <button className='button' onClick={() => loginWithRedirect()}>Iniciar Sesion</button>
        </div>
      </div>

    </div>
  )
}
