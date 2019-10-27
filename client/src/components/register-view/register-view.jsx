import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

export function RegisterView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, confirmPassword] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onRegistered(username);
    };

  return (
    <div>
   
    <form className="register-view">
    <h1 className="logoTitle">movieDB</h1>
      <label>
        Username: &nbsp;
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Email: &nbsp;
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday: &nbsp;
        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <label>
        Password: &nbsp;
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password: &nbsp;
        <input type="password" value={password2} onChange={e => confirmPassword(e.target.value)}/>
      </label>
  
      <Button variant ="primary" type="button" onClick={handleSubmit}>Register</Button>
    </form>
  
    </div>
  
  );
}