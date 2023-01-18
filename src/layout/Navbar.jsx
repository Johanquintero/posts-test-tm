import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
    const { logout, user } = useAuth0();
    return (
        <div className='navbar'>
            <ul style={{height:50,color:"#fff",display:"flex" ,justifyContent:"space-around",alignItems:"center"}}>
                <li><img src={user.picture} alt={user.name} width={50}/></li>
                <li><h2 style={{fontSize:"3vh"}}>{user.name}</h2></li>
                <li><p>{user.email}</p></li>

                <button className='button btn-logout' onClick={() => logout({ returnTo: window.location.origin })}>
                    Log Out
                </button>

            </ul>
        </div>
    )
}
