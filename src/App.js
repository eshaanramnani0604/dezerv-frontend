
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import React, { useState } from 'react';
function App() {
 
  const [registerShow, setRegisterShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const [changePasswordShow, setChangePasswordShow] = useState(false);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [isPasswordError,setIsPasswordError]=useState(false);
  const [passwordErrors,setPasswordErrors]=useState([]);
  const [errorMessage,setErrorMessage]=useState('');
  const toggleRegisterShow = () => setRegisterShow(!registerShow);
  const toggleLoginShow = () => setLoginShow(!loginShow);
  const toggleChangePasswordShow = () => setChangePasswordShow(!changePasswordShow);
  const setEmailValue = (event) => {
    setEmail(event.target.value);
    
  }
  const setPasswordValue = (event) => {
    setPassword(event.target.value);
    
  }
  
  const submitRegister=()=>{
    setIsPasswordError(false)
    setPasswordErrors([])
    setErrorMessage('')
    fetch('http://localhost:8000/register',{
      method:'POST',
      body:JSON.stringify({"Email":email,"Password":password}),
      headers: { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin':'*'},
    })
    .then(res=>res.json())
    .then(json=>{
      console.log(json)
      if(json.success===true){
        alert('registration successful');
        setRegisterShow(!registerShow);
        setEmail('');
        setPassword('');
      }else{
      if(json.isPasswordError){
        setIsPasswordError(true);
        setPasswordErrors(json.errors);
      }else{
        setErrorMessage(json.message);
      }
      
      
    }
    })
  }
  const submitLogin=()=>{
    setIsPasswordError(false)
    setPasswordErrors([])
    setErrorMessage('')
    fetch('http://localhost:8000/sign-in',{
      method:'POST',
      body:JSON.stringify({"Email":email,"Password":password}),
      headers: { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin':'*'},
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success===true){
        alert('login successful');
        setLoginShow(!loginShow);
        setEmail('');
        setPassword('');
      }else{
        setErrorMessage(json.message);
      }
    })
  }
  const submitChangePassword=()=>{
    setIsPasswordError(false)
    setPasswordErrors([])
    setErrorMessage('')
    fetch('http://localhost:8000/change-password',{
      method:'POST',
      body:JSON.stringify({"Email":email,"Password":password}),
      headers: { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin':'*'},
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success===true){
        alert('registration successful');
        setRegisterShow(!registerShow);
        setEmail('');
        setPassword('');
      }else{
      if(json.isPasswordError){
        setIsPasswordError(true);
        setPasswordErrors(json.errors);
      }else{
        setErrorMessage(json.message);
      }
      
      
    }
    })
  }
  return (
    <>
    <Navbar bg="light" expand="lg">
  <Navbar.Brand >Dezerv-demo</Navbar.Brand>
 
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto header">
      <Nav.Link onClick={toggleRegisterShow}>Register</Nav.Link>
      <Nav.Link onClick={toggleLoginShow}>Login</Nav.Link>
      <Nav.Link onClick={toggleChangePasswordShow}>Change Password</Nav.Link>
      
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
<Modal show={registerShow}>
  <Modal.Header closeButton onClick={toggleRegisterShow}>
    <Modal.Title>Register</Modal.Title>
  </Modal.Header>

  <Modal.Body>
  
  
  <div >
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email"
     placeholder="name@example.com" value={email} onChange={setEmailValue}
    />
    {(errorMessage!=='') &&
       <p className="err"> {errorMessage}</p>
    }
</div>
<div>
      <label htmlFor="password">Password</label>
    <input className="form-control" id="name" type="password" value={password} onChange={setPasswordValue} />
    {isPasswordError &&
      <div>
      <p className='err'>Please rectify the following error(s)</p>
       <ul> {passwordErrors.map(err=><li className='err' key={err}>{err}</li> )}</ul>
       </div>
    }
  </div> 

  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={toggleRegisterShow}>Close</Button>
    <Button variant="primary" onClick={submitRegister}>Register</Button>
  </Modal.Footer>
</Modal>
<Modal show={loginShow}>
  <Modal.Header closeButton onClick={toggleLoginShow}>
    <Modal.Title>Login</Modal.Title>
  </Modal.Header>

  <Modal.Body>
  
  
  <div >
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email"
     placeholder="name@example.com" value={email} onChange={setEmailValue}
    />
</div>
<div>
      <label htmlFor="password">Password</label>
    <input className="form-control" id="name" type="password" value={password} onChange={setPasswordValue} />
    {(errorMessage!=='') &&
       <p className="err"> Incorrect Email or Password</p>
    }
  </div> 

  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={toggleLoginShow}>Close</Button>
    <Button variant="primary" onClick={submitLogin}>Login</Button>
  </Modal.Footer>
</Modal>
<Modal show={changePasswordShow}>
  <Modal.Header closeButton onClick={toggleChangePasswordShow}>
    <Modal.Title>Change Password</Modal.Title>
  </Modal.Header>

  <Modal.Body>
  
  
  <div >
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email"
     placeholder="name@example.com" value={email} onChange={setEmailValue}
    />
    {(errorMessage!=='') &&
       <p className="err"> {errorMessage}</p>
    }
</div>
<div>
      <label htmlFor="password">New Password</label>
    <input className="form-control" id="name" type="password" value={password} onChange={setPasswordValue} />
    {isPasswordError &&
      <div>
      <p className='err'>Please rectify the following error(s)</p>
       <ul> {passwordErrors.map(err=><li className='err' key={err}>{err}</li> )}</ul>
       </div>
    }
  </div> 

  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={toggleChangePasswordShow}>Close</Button>
    <Button variant="primary"   onClick={submitChangePassword}>Change Password</Button>
  </Modal.Footer>
</Modal>
</>
  );
}

export default App;
