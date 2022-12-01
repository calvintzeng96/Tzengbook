import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
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
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()
  const { setModalType } = useContext(ModalContext)

  const onSignUp = async (e) => {

    // let errArray = []
    e.preventDefault();
    console.log("----------------")
    // if (firstName.length > 3)
    if (password === repeatPassword) {
      dispatch(signUp(username, email, password, firstName, lastName))
        // console.log("-------------", data)
        .then(res => {
          console.log("---",res)
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

    // setErrors(["test: test bad"])
    // console.log(errors)
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
    <form className="modal-content" onSubmit={onSignUp}>
      <h3>Sign Up</h3>
      <p>It's quick and easy</p>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          required
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          required
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          required
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          required
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          required
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          required
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
