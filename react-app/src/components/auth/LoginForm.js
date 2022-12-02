import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { ModalContext } from '../../context/Modal';
import "../Home/index.css"




const LoginForm = () => {

  const { setModalType } = useContext(ModalContext)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    console.log("lllllllllllll")
    await dispatch(login(email, password))
      .then((res) => {
        if (res !== null) {
          setErrors(res)
        }
      })
  };
  useEffect(() => {
    setErrors([])
  }, [email, password])

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = () => {
    setEmail("email1@gmail.com");
    setPassword("password1");
    return dispatch(login(email, password));
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="home-logged-out-upper-right">

      <form id="login-form" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div className="error-handling" key={ind}>{error}</div>
          ))}
        </div>
        {/* <div className="login-form-input"> */}
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required
            className="login-form-input"
            />
        {/* </div> */}
        {/* <div className="login-form-input"> */}
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            required
            className="login-form-input"
          />
        {/* </div> */}
        <button className="cursor" type='submit'>Log In</button>
        <button className="cursor" onClick={() => demoLogin()}>Demo Login</button>
      </form>
      <button id="create-account-button" className="cursor" onClick={() => setModalType("Signup")}>Create new account</button>
    </div>
  );
};

export default LoginForm;
