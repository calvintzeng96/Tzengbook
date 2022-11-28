import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import "./index.css"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    // history.push("/")
    dispatch(logout())
    .then(() => {
      history.push("/")
    });
  };

  return <button id="logout-button" className="cursor" onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
