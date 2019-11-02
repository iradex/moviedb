import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://moviedatabase5.herokuapp.com/login', {
      username: username,
      password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
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