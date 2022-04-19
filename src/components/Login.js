import React from 'react'
import { auth, provider } from "../firebase";
const Login = () => {
    function signin(e) {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((err) => {
          alert(err.message);
        });
      }
    return (
        <button onClick={signin}>
Login
        </button>
    )
}

export default Login