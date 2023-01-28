import { useState,useRef } from 'react';
import {signIn} from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from './auth-form.module.css';


async function createUser(email,password){
  const response= await fetch('/api/auth/signup',{
    method:'POST',
    body:JSON.stringify({email,password}),
    headers:{
      'Content-Type':'application/json'
    }
  });
  const data= await response.json();
  if(!response.ok){
    throw new Error(data.message || 'Something went wrong');
  }
  return data;

}

function AuthForm() {
  const emailInputRef=useRef();
  const passwrodInputRef=useRef();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

 

 async function submitHandler(event){
    event.preventDefault();
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwrodInputRef.current.value;
  //   if(isLogin){
  //     const result=await signIn('credentials',{
  //       redirect:true,
  //       email:enteredEmail,
  //       password:enteredPassword,
      
  //     });
  //   }else{
  //     try{
  //      const result= await createUser(enteredEmail,enteredPassword);
  //      console.log(result)
  //     }catch(error){
  //       console.log(error)
  //     }
       
  //   }
  // }

  if (isLogin) {
    const result = await signIn('credentials', {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

     console.log(JSON.stringify(result))

     if (!result.error) {
      // set some auth state
      router.replace('/profile');
    }else{
        let res=document.getElementById("error-message")
        res.textContent="Please Provide Correct Credentials !!!"
        res.style.color="white";

    }
  } else {
    try {
      const result = await createUser(enteredEmail, enteredPassword);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwrodInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          <p id="error-message"></p>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;