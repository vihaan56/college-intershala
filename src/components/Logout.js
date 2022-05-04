import React from 'react'
import { Navigate , useNavigate  } from "react-router-dom";

function Logout() {

    if(localStorage.getItem('token') === null || sessionStorage.getItem('userstatus') === null){
         return (<Navigate to="/"></Navigate>)
    }
    else{
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/'
    }

  return (
    <div></div>
  )
}

export default Logout