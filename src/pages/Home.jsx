import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { logout } = useAuth0();

  return (
    <div>
      <div>
        <ul>
          <li><a href="#">Home</a></li>


          <button className='button btn-logout' onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>

        </ul>
      </div>

    </div>
  )
}
