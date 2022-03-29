import React, {useState} from 'react'
import {auth, fstore} from '../../Config/Config'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import './style.css'

const Signup = () => {

  const Nav = useNavigate();

  const [FirstName, setFirstName]=useState('');
  const [LastName, setLastName]=useState('');
  const [Email, setEmail]=useState('');
  const [Password, setPassword]=useState('');

  const [EMessage, setEMessage]=useState('');
  const [SMessage, setSMessage]=useState('');

  const Handle=(e)=>{
    e.preventDefault();
    // console.log(FirstName, LastName, Email, Password);
    auth.createUserWithEmailAndPassword(Email, Password).then((credentials)=>{
      console.log(credentials);
      fstore.collection('users').doc(credentials.user.uid).set({
        FName: FirstName,
        LName: LastName,
        EMail: Email,
        PWord: Password
      }).then(()=>{
        setSMessage('You have Signed up Successfully! Redirecting to Login');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setEMessage('');
        setTimeout(()=>{
          setSMessage('');
          Nav("../login", {replace: true});
        },3000)
      }).catch(error=>setEMessage(error.message));
    }).catch((error)=>{
      setEMessage(error.message)
    })
  }

  return (
    <div className='container'>
      <br></br>
      <br></br>
      <h1>Sign Up!</h1>
      <hr></hr>
      {SMessage&&<>
        <div className='SMSG'>{SMessage}</div>
        <br></br>
      </>}
      <form className='form-group' autoComplete="off" onSubmit={Handle}>
        <div className='txt_field'>
        <span></span>
        <label>First Name</label>
        <input type="text" className='form-control' required onChange={(e)=>setFirstName(e.target.value)} value={FirstName}></input>
        <br></br>
        </div>
        <div className='txt_field'>
        <span></span>
        <label>Last Name</label>
        <input type="text" className='form-control' required onChange={(e)=>setLastName(e.target.value)} value={LastName}></input>
        <br></br>
        </div>
        <div className='txt_field'>
        <span></span>
        <label>Email</label>
        <input type="email" className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={Email}></input>
        <br></br>
        </div>
        <div className='txt_field'>
        <span></span>
        <label>Password</label>
        <input type="password" className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={Password}></input>
        <br></br>
        </div>
        <div className='btn-box'>
          <span>Already have an account? Login <Link to="/login">Here</Link></span>
          <button className='btn btn-success btn-md' type='submit'>SIGN UP</button>
        </div>
      </form>
      {EMessage&&<>
        <div className='EMSG'>{EMessage}</div>
        <br></br>
      </>}
    </div>
  )
}

export default Signup