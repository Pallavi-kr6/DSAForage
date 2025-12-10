import React from "react";
import GoogleLogin from "../components/GoogleLogin.jsx";

const Login=()=>{
    return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh'}}>
            <h2>Login Page</h2>
            <GoogleLogin/>
        </div>
    )
}

export default Login;