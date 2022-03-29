import React, {useState} from 'react'
import {fstore} from '../../Config/Config'
import {Link} from 'react-router-dom'

const EmployeeAdder = () => {
    const [Ename, setEname] = useState('');
    const [Epos, setEpos] = useState('');
    const [Epay, setEpay] = useState('');
    const [Enum, setEnum] = useState('');

    const [EMessage, setEMessage]=useState('');
    const [SMessage, setSMessage]=useState('');

    const handleEmployee=(e)=>{
        e.preventDefault();
        fstore.collection('Employees').add({
            Name: Ename,
            Position: Epos,
            Pay: Number(Epay),
            Number: Enum
        }).then(()=>{
            setSMessage('Employee has been added');
            setEname('');
            setEpos('');
            setEpay('');
            setEnum('');
            setEMessage('');
            setTimeout(()=>{
                setSMessage('');
                }, 3000)
        }).catch(error=>setEMessage(error.message))
    }


  return (
    <div className='container'>
    <br></br>
    <br></br>
    <h1>Add Employee</h1>
    <br></br>
    {SMessage&&<>
      <div className='SMSG'>{SMessage}</div>
      <br></br>
    </>}
    <form autoComplete='off' className='form-group' onSubmit={handleEmployee}>
    <label>Employee Name</label>
    <input type="text"className="form-control" required
    onChange={(e)=>setEname(e.target.value)} value={Ename}></input>
    <br></br>
    <label>Employee Position</label>
    <input type="text" className='form-control' required
    onChange={(e)=>setEpos(e.target.value)} value={Epos}></input>
    <br></br>
    <label>Employee Pay</label>
    <input type="text" className='form-control' required
    onChange={(e)=>setEpay(e.target.value)} value={Epay}></input>
    <br></br>
    <label>Employee Number</label>
    <input type='text' className='form-control' required
    onChange={(e)=>setEnum(e.target.value)} value={Enum}></input>
    <br></br>
    <br></br>
    <span>Return Home: <Link to="/">Here</Link></span>
    <div style={{display:'flex', justifyContent:'flex-end'}}>
        <button type='submit' className='btn btn-success btn-md'>
            Add Employee
        </button>
    </div>
    </form>
    {EMessage&&<>
      <br></br>
      <div className='EMSG'>{EMessage}</div>
    </>}
    </div>
  )
}

export default EmployeeAdder