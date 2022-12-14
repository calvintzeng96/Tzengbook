import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux'
import { ModalContext } from '../../context/Modal';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();
  const { setModalType } = useContext(ModalContext)

  const onSignUp = async (e) => {

    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(signUp(username, email, password, firstName, lastName))
        .then(res => {
          if (res == null) {
            setModalType(null)
          } else {
            setErrors(res)
          }
          return
        })
    } else {
      setErrors(["Password and Confirm Password must match."]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <form id="signup-form" className="modal-content" onSubmit={onSignUp}>
      <h3 id="signup-title">Sign Up</h3>
      <div id="signup-text">It's quick and easy</div>
      <div className="shift-right-12px">
        {errors.map((error, ind) => (
          <div className="error-handling" key={ind}>{error}</div>
        ))}
      </div>
      <div id="first-last-name-container">
        <input
          required
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={firstName}
          placeholder="First name"
          autoComplete="off"
        ></input>

        <input
          required
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={lastName}
          placeholder="Last name"
          autoComplete="off"
        ></input>
      </div>

      <input
        required
        type='text'
        name='username'
        onChange={updateUsername}
        value={username}
        placeholder="Username"
        autoComplete="off"
      ></input>

      <input
        required
        type='text'
        name='email'
        onChange={updateEmail}
        value={email}
        placeholder="Email"
        autoComplete="off"
      ></input>

      <input
        required
        type='password'
        name='password'
        onChange={updatePassword}
        value={password}
        placeholder="New password"
      ></input>

      <input
        required
        type='password'
        name='repeat_password'
        onChange={updateRepeatPassword}
        value={repeatPassword}
        placeholder="Confirm password"
      ></input>
      <p>
        People who use our service may have uploaded your contact information to Tzengbook.
      </p>
      <p>
        By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive Email Notifications from us and can opt out any time.
      </p>

      <button className="cursor" type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
