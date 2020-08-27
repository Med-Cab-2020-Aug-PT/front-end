import React, { useState,useEffect } from "react"
import * as yup from "yup";
import axios from "axios";


export default function LoginForm (){

const [loginState, setLoginForm] = useState ({
    username:"",
    password:""
});

const [errors, setErrors] = useState ({
    username:"",
    password:""
});
    
const [buttonDisabled, setButtonDisabled] = useState(true);

const validateChange = e =>{
    yup
    .reach(formSchema, e.target.username)
    .validate(e.target.value)
    .then(valid =>{
        setErrors({
            ...errors,[e.target.username]: ""})
        // console.log("login successful")
    })
    .catch(err => {
        setErrors({...errors,[e.target.username]: err.errors[0]});
        console.log("error:",err);
  
      });
};

const formSchema =yup.object().shape({
    username: yup
    .string()
    .min(2, "Username must be at least 2 characters")
    .required("Must include username."),
    password : yup
    .string()
    .required("Password is required")
})

  useEffect(() =>{
    if(loginState.value === ""){
        setButtonDisabled(true);
    }else{setButtonDisabled(false)}
},[loginState])


  const login = e =>{
      e.preventDefault();
      console.log("login success")
      axios
      .post("https://reqres.in/api/users",loginState)
        .then(res => {
        console.log("success!",res.data);

        setLoginForm({
            username:"",
            password:""
        });
    })
    .catch(err => console.log(err.response));

  }
 
  const inputChange = e =>{
      e.persist();
      console.log("something changed")
      setLoginForm(e.target.value)
      validateChange(e)
      
  }
return(
    <form onSubmit={login}>
        <h1>Login</h1>
        <label htmlFor='username'> 
            <input
                type='text'
                placeholder="Username"
                name='username'
                value={loginState.username}
                onChange={inputChange}
                />
            </label>  
            {errors.username.length > 0 ? <p className="error">{errors.username}</p> : null}

            <label htmlFor='password'> 
            <input
                type='password'
                name='password'
                placeholder="Password"

                value={loginState.password}
                onChange={inputChange}
                />
            </label>  
            {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}

            <button disabled = {buttonDisabled} type = "submit">Login</button>
 </form>
)
}
