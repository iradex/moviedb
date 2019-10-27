import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
    };

  return (
    <div>
   
    <form className="login-view">
    <h1 className="logoTitle">movieDB</h1>
      <label>
        Username: &nbsp;
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password: &nbsp;
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <Button variant ="primary" type="button" onClick={handleSubmit}>Log In</Button>
    </form>
   
    </div>
  
  );
}

LoginView.propTypes = {
  onClick: PropTypes.func.isRequired
};