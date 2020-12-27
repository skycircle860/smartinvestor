import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { authService, firebaseInstance } from "fbase";


const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
  
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault(); //해당 코드를 사용하지 않으면 submit 동작 시 새로고침 된다.
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const onSocialClick = async(event) => {
    const {
        target : {name},
    } = event;
    let provider;
    if(name === "google"){
        provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name ==="github"){
        provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);

};

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <Form onSubmit={onSubmit} className="container">
        <span className="authFormTitle">Smart Investor</span>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" placeholder="Enter email" name="email"
            required
            value={email}
            onChange={onChange}
            className="authInput"/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" placeholder="Password" name="password"
            required
            value={password}
            onChange={onChange}
            className="authInput"/>
        </Form.Group>
        <Button variant="primary" 
            type="submit" 
            className="authInput authSubmit" 
            value={newAccount ? "Create Account" : "Sign In"}>
          로그인
        </Button>
        {error && <span className="authError">{error}</span>}
        <Button variant="info"  onClick={toggleAccount} className="authSwitch" >
          {newAccount ? "로그인" : "계정생성"}
        </Button>
        <Button variant="secondary" onClick={onSocialClick} name="google" className="authBtn">
            구글로 로그인 
        </Button>
        <Button variant="warning" onClick={onSocialClick} name="github" className="authBtn">
            깃허브로 로그인
        </Button>
        
      </Form>
      
         
      
    </>
  );
};
export default AuthForm;