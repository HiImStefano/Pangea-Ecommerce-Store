import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../Config/Config'
import {useNavigate} from 'react-router-dom'
import './style.css'


const Login = () => {

  const Nav = useNavigate();

    const [Email, setEmail]=useState('');
    const [Password, setPassword]=useState('');
  
    const [EMessage, setEMessage]=useState('');
    const [SMessage, setSMessage]=useState('');

    const Handle=(e)=>{
        e.preventDefault();
        //console.log(Email, Password);
        auth.signInWithEmailAndPassword(Email,Password).then(()=> {
          setSMessage('Login Successful!');
          setEmail('');
          setPassword('');
          setEMessage('');
          setTimeout(()=>{
          setSMessage('');
          Nav("../", {replace: true});
        },3000)
        }).catch(error=>setEMessage(error.message));
      }

    return (
        <div className='container'>
          <br></br>
          <br></br>
          <h1>Login</h1>
          <hr></hr>
          {SMessage&&<>
          <div className='SMSG'>{SMessage}</div>
          <br></br>
          </>}
          <form className='form-group' autoComplete="off" onSubmit={Handle}>
            <div className='txt_field'>
            <label>Email</label>
            <input type="email" className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={Email}></input>
            <br></br>
            </div>
            <div className='txt_field'>
            <label>Password</label>
            <input type="password" className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={Password}></input>
            <br></br>
            </div>
            <div className='btn-box'>
              <span>Don't have an account? Sign Up! <Link to="/signup">Here</Link></span>
              <button className='btn btn-success btn-md' type='submit'>Login</button>
            </div>
          </form>
          {EMessage&&<>
        <div className='EMSG'>{EMessage}</div>
        <br></br>
        </>}
        </div>
    )
}

export default Login