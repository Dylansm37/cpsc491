//import React from 'react'
import React, { useState } from 'react';
import './LoginPage.css'


import user_icon from '/home/dylan/cpsc490/project/login-signup/frontend/src/Components/Assets/person.png'
import email_icon from '/home/dylan/cpsc490/project/login-signup/frontend/src/Components/Assets/email.png'
import password_icon from '/home/dylan/cpsc490/project/login-signup/frontend/src/Components/Assets/password.png'



const LoginPage = () => {


   const [action, setAction] = useState("Login");


 return (
  
   <div className ="title">


       <h1>CPSC 490 PROJECT</h1>

   <div className='container'>
    <div className="header">
     <div className="text">{action}</div>
     <div className="underline"></div>
    </div>
    <div className="inputs">
       {action === "Login"?<div></div>:<div className="input">
         <img src={user_icon} width={25} height={25} alt=""/>
         <input type="text" placeholder='Username'/>
       </div>
       }
      
        <div className="input">
         <img src={email_icon} width={25} height={25} alt=""/>
         <input type="email" placeholder='Email' />
       </div>
        <div className="input">
         <img src={password_icon}width={25} height={25} alt=""/>
         <input type="password" placeholder='Password'/>
       </div>
    </div>


    {action=== "Sign Up"? <div></div>: <div className="forgot-password">Forgot password? <span>Click Here</span></div>}
   
    <div className="submit-container">
       <div className={action === "Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
       <div className={action === "Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>


       </div>


  
   
   </div>




       </div>
 );
};


export default LoginPage;

