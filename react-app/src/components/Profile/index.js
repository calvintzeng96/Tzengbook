import { useDispatch, useSelector } from "react-redux"
import NavBar from "../NavBar/NavBar"
import "./index.css"
import { useEffect, useState } from "react"
import icon from "../../assets/default-profile-icon.png"
import homeIcon from "../../assets/home-icon.png"
import { getUsersPosts } from "../../store/post"
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






const Profile = () => {
    const { userId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.user.singleUser)
    const dispatch = useDispatch()
    const history = useHistory()
    const [friendsPage, setFriendsPage] = useState(false)
    const friends = useSelector(state => state.friend.allFriends)
    const [friendsArray, setFriendsArray] = useState([])

    useEffect(() => {
        setFriendsPage(false)
        if (window.location.pathname.endsWith("/friends")) {
            setFriendsPage(true)
            dispatch(getUser(userId))
                .then(() => {
                    dispatch(getUsersFriends(userId))
                        .then((res) => {
                            setFriendsArray(res.friends)
                        })
                })
        } else {
            dispatch(getUser(userId))
                .then(() => {
                    dispatch(getUsersPosts(userId))
                        .then(() => {
                            dispatch(getUsersFriends(userId))
                                .then((res) => {
                                    setFriendsArray(res.friends)
                                })
                        })
                    window.scrollTo(0, 0)
                })

        }
    }, [userId, friendsPage, history.location.pathname])

    const goToProfile = () => {
        dispatch(getUser(currentUser.id))
            .then(() => {
                dispatch(getUsersPosts(currentUser.id))
            })
        history.push(`/users/${currentUser.id}`)
    }

    const goToFriends = (userId) => {
        // setFriendsPage(true)
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
                    <img className="profile-left-icons cursor" onClick={() => history.push("/")} src={homeIcon} />
                    <img className="profile-left-icons cursor" onClick={goToProfile} src={currentUser?.profilePicture ? currentUser?.profilePicture : icon} />
                    <div id="profile-left-spacer"></div>
                    <img className="profile-left-icons cursor" onClick={linkedInLink} src={linkedInIcon} />
                    <img className="profile-left-icons cursor" onClick={githubLink} src={githubIcon} />
                    <img className="profile-left-icons cursor" onClick={medianLink} src={medianIcon} />
                    <img className="profile-left-icons cursor" onClick={airzzzLink} src={airzzzIcon} />
                </div>
                <div id="profile-right" className="">
                    <div id="profile-header-container">
                        <div id="profile-header" className="">
                            <img onClick={() => goToProfileUserId(user.id)} className="cursor" id="profile-pic" src={user.profilePicture ? user.profilePicture : icon} />
                            <div onClick={() => goToProfileUserId(user.id)} className="cursor" id="profile-name">{user.firstName} {user.lastName}</div>
                        </div>
                    </div>
                    <div id="profile-body">
                        {friendsPage && (
                            <div>
                                <AllUsersFriends friendsArray={friendsArray} />
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
                                        <SomeUsersFriends friendsArray={friendsArray.slice(0,6)} />
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
