
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogoutButton from "../auth/LogoutButton"
import "./index.css"
import defaultProfileIcon from "../../assets/default-profile-icon.png"
import tzengbookIcon from "../../assets/tzengbook-logged-in.png"
import {getUser} from "../../store/user"

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user)
  const image = currentUser?.profilePicture
  const history = useHistory()
  const dispatch = useDispatch()

  const goHome = () => {
    if (window.location.pathname == "/") return
    history.push("/")
  }

  const goToProfile = () => {
    dispatch(getUser(currentUser.id))
    history.push(`/users/${currentUser.id}`)
  }

  return (
    <div id="nav-bar">
      <img onClick={goHome} id="tzengbook-icon-logged-in" className="cursor" src={tzengbookIcon} />
      <div id="nav-bar-right">
        <img onClick={goToProfile} id="profile-icon" className="cursor" src={image ? currentUser?.profilePicture : defaultProfileIcon} />
        {/* <button id="profile-icon">profile button</button> */}
        <LogoutButton />
      </div>
    </div>
  );
}

export default NavBar;
