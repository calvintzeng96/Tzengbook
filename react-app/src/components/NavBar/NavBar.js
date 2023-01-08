
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogoutButton from "../auth/LogoutButton"
import "./index.css"
import defaultProfileIcon from "../../assets/default-profile-icon.png"
import tzengbookIcon from "../../assets/tzengbook-logged-in.png"
import { deleteRequest, getIncomingRequests, getOutgoingRequests } from "../../store/request"
import { createFriend } from "../../store/friend"
import SearchBar from '../SearchBar';

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user)
  const image = currentUser?.profilePicture
  const history = useHistory()
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false)
  const incomingArr = Object.values(useSelector(state => state.request.incoming))

  useEffect(() => {
    if (dropdown) {
      document.body.addEventListener("click", (e) => {
        if (!e.target.className.includes("dd")) {
          setDropdown(false)
        }
      })
    }
  }, [dropdown])

  useEffect(() => {
    dispatch(getIncomingRequests(currentUser.id))
    dispatch(getOutgoingRequests(currentUser.id))
  }, [])

  const goHome = () => {
    if (window.location.pathname === "/") return
    history.push("/")
  }

  const goToProfile = () => {
    history.push(`/users/${currentUser.id}`)
  }

  const goToProfileUserId = (userId) => {
    history.push(`/users/${userId}`)
  }

  const notificationButton = () => {
    dropdown ? setDropdown(false) : setDropdown(true)
  }

  const acceptRequest = (myId, userId) => {

    dispatch(createFriend(myId, userId))
      .then(() => {
        dispatch(deleteRequest(myId, userId))
      })
  }
  const declineRequest = (myId, userId) => {
    dispatch(deleteRequest(myId, userId))
  }

  return (
    <div id="nav-bar">
      <img onClick={goHome} id="tzengbook-icon-logged-in" className="cursor" src={tzengbookIcon} alt="favicon" />
      <SearchBar />
      <div id="nav-bar-right">
        <button onClick={notificationButton} id="notification-icon" className="cursor dd">{incomingArr.length ? incomingArr.length : ""}</button>
        {dropdown && (
          <div id="notification-dropdown" className="dd">
            <div id="notification-title" className="dd">FRIEND REQUESTS</div>
            {incomingArr.length === 0 && (
              <div id="no-requests" className="notification-card dd">No Requests</div>
            )}
            {incomingArr.map(ele => {
              return (
                <div key={ele.id} className="notification-card dd">
                  <div className="notification-card-top dd">
                    <img onClick={() => goToProfileUserId(ele.id)} className="notification-image cursor dd" src={ele.profilePicture} alt="bell icon" />
                    <div onClick={() => goToProfileUserId(ele.id)} className="notification-name cursor dd">{ele.firstName} {ele.lastName} </div>
                    <div className="dd"> sent you a friend request</div>

                  </div>
                  <div className={`request-options dd`}>
                    <button onClick={() => acceptRequest(currentUser.id, ele.id)} className="accept-button cursor dd">Accept</button>
                    <button onClick={() => declineRequest(currentUser.id, ele.id)} className="decline-button cursor dd">Decline</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}


        <img onClick={goToProfile} id="profile-icon" className="cursor" src={image ? currentUser?.profilePicture : defaultProfileIcon} alt="profile icon" />
        <LogoutButton />
      </div>
    </div>
  );
}

export default NavBar;
