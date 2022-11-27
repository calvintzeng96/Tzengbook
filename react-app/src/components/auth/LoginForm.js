import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { ModalContext } from '../../context/Modal';





const LoginForm = () => {

  const { setModalType } = useContext(ModalContext)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

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
    <div>

      <form className="border" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button type='submit'>Login</button>
        <button onClick={() => demoLogin()}>Demo Login</button>
      </form>
      <button onClick={() => setModalType("Signup")}>Create new account</button>
    </div>
  );
};

export default LoginForm;
