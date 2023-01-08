import { useDispatch, useSelector } from "react-redux"
import NavBar from "../NavBar/NavBar"
import "./index.css"
import { useEffect, useState } from "react"
import icon from "../../assets/default-profile-icon.png"
import homeIcon from "../../assets/home-icon.png"
import { getUser } from "../../store/user"
import { getUsersFriends } from "../../store/friend";

import { useHistory, useParams } from "react-router-dom"
import MidSection from "../MidSection"
import { linkedInLink, githubLink, airzzzLink, medianLink } from "../../assets/helper";
import linkedInIcon from "../../assets/linkedin-logo.png"
import githubIcon from "../../assets/github-logo.svg"
import airzzzIcon from "../../assets/airzzz-icon.png"
import medianIcon from "../../assets/median-icon.png"
import AllUsersFriends from "../AllUsersFriends"
import SomeUsersFriends from "../SomeUsersFriends"
import FriendshipOption from "../FriendshipOption"
import { getOutgoingRequests } from "../../store/request"
import { getUsersPosts2 } from "../../store/post"


const Profile = () => {
    const { userId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.user.singleUser)
    const dispatch = useDispatch()
    const history = useHistory()
    const [friendsPage, setFriendsPage] = useState(false)
    const [friendsArray, setFriendsArray] = useState([])
    const [status, setStatus] = useState("")
    const requests = useSelector(state => state.request)
    const outgoing = useSelector(state => state.request.outgoing)
    const friendsList = useSelector(state => Object.keys(state.friend.allFriends).length)

    useEffect(() => {
        dispatch(getUsersPosts2(userId))
    }, [userId])

    useEffect(() => {
        dispatch(getUsersFriends(userId))
                    .then((res) => {
                        setFriendsArray(res.friends)
                        let temp = "not friends"
                        if (currentUser.id == userId) {
                            temp = "myself"
                        } else {
                            for (let i = 0; i < res.friends.length; i++) {
                                if (res.friends[i].id === currentUser.id) {
                                    temp = "friends"
                                    break
                                }
                            }
                        }
                        if (temp === "not friends") {
                            let incomingKeys = Object.keys(requests.incoming)
                            let outgoingKeys = Object.keys(requests.outgoing)
                            if (incomingKeys.includes(userId)) {
                                temp = "incomingRequest"
                            } else if (outgoingKeys.includes(userId)) {
                                temp = "outgoingRequest"
                            }
                        }
                        setStatus(temp)
                    })
    }, [friendsList])

    useEffect(() => {
        setFriendsPage(false)
        if (window.location.pathname.endsWith("/friends")) {
            setFriendsPage(true)
        }
        dispatch(getUser(userId))
            .then(() => {
                dispatch(getUsersFriends(userId))
                    .then((res) => {
                        setFriendsArray(res.friends)
                        let temp = "not friends"
                        if (currentUser.id == userId) {
                            temp = "myself"
                        } else {
                            for (let i = 0; i < res.friends.length; i++) {
                                if (res.friends[i].id === currentUser.id) {
                                    temp = "friends"
                                    break
                                }
                            }
                        }
                        if (temp === "not friends") {
                            let incomingKeys = Object.keys(requests.incoming)
                            let outgoingKeys = Object.keys(requests.outgoing)
                            if (incomingKeys.includes(userId)) {
                                temp = "incomingRequest"
                            } else if (outgoingKeys.includes(userId)) {
                                temp = "outgoingRequest"
                            }
                        }
                        setStatus(temp)
                    })
                window.scrollTo(0, 0)
            })
    }, [outgoing, history.location.pathname])


    const goToProfile = () => {
        history.push(`/users/${currentUser.id}`)
    }

    const goToFriends = (userId) => {
        history.push(`/users/${userId}/friends`)
    }

    const goToProfileUserId = (userId) => {
        history.push(`/users/${userId}`)
    }

    return (
        <div>
            <NavBar />
            <div id="profile-container" className="">
                <div id="profile-left" className="">
                    <img className="profile-left-icons cursor" onClick={() => history.push("/")} src={homeIcon} alt="home icon" />
                    <img className="profile-left-icons cursor" onClick={goToProfile} src={currentUser?.profilePicture ? currentUser?.profilePicture : icon} alt="profile icon" />
                    <div id="profile-left-spacer"></div>
                    <img className="profile-left-icons cursor" onClick={linkedInLink} src={linkedInIcon} alt="linkedin icon" />
                    <img className="profile-left-icons cursor" onClick={githubLink} src={githubIcon} alt="github icon" />
                    <img className="profile-left-icons cursor" onClick={medianLink} src={medianIcon} alt="median icon" />
                    <img className="profile-left-icons cursor" onClick={airzzzLink} src={airzzzIcon} alt="airzzz icon" />
                </div>
                <div id="profile-right" className="">
                    <div id="profile-header-container">
                        <div id="profile-header" className="">
                            <img onClick={() => goToProfileUserId(user.id)} className="cursor" id="profile-pic" src={user.profilePicture ? user.profilePicture : icon} alt="profile" />
                            <div onClick={() => goToProfileUserId(user.id)} className="cursor underline-hover" id="profile-name">{user.firstName} {user.lastName}</div>
                            <FriendshipOption status={status} userId={userId} />


                        </div>
                    </div>
                    <div id="profile-body">
                        {friendsPage && (
                            <div>
                                <AllUsersFriends friendsArray={friendsArray} status={status} />
                            </div>
                        )}
                        {!friendsPage && (
                            <>
                                <div id="profile-body-left">

                                    <div id="intro" className="profile-body-left-content">
                                        <div id="intro-title">Intro</div>
                                        <div className="intro-content">

                                            <div className="intro-info-title">Bio: </div>
                                            <div className="intro-info-content">{user.bio}</div>
                                        </div>
                                    </div>

                                    <div className="profile-body-left-content">
                                        <div id="profile-friend-sample-top">
                                            <div id="profile-friend-sample-top-title">Friends</div>
                                            <div id="see-all-friends" className="cursor" onClick={() => goToFriends(user.id)}>See all friends</div>
                                        </div>
                                        <div id="profile-friend-sample-count">{friendsArray.length} {friendsArray.length > 2 ? "friends" : "friend"}</div>
                                        <SomeUsersFriends friendsArray={friendsArray.slice(0, 6)} />
                                    </div>

                                </div>
                                <div id="profile-body-right">
                                    <MidSection />
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile
