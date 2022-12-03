import { useDispatch, useSelector } from "react-redux"
import NavBar from "../NavBar/NavBar"
import "./index.css"
import { ModalContext } from "../../context/Modal"
import { useContext, useEffect } from "react"
import icon from "../../assets/default-profile-icon.png"
import homeIcon from "../../assets/home-icon.png"
import { getUsersPosts } from "../../store/post"
import ProfileSub from "../ProfileSub"
import GetAllPosts from "../Posts"
import { getUser } from "../../store/user"
import { useHistory, useParams } from "react-router-dom"
import MidSection from "../MidSection"
import { linkedInLink, githubLink, airzzzLink, medianLink } from "../../assets/helper";
import linkedInIcon from "../../assets/linkedin-logo.png"
import githubIcon from "../../assets/github-logo.svg"
import airzzzIcon from "../../assets/airzzz-icon.png"
import medianIcon from "../../assets/median-icon.png"







const Profile = () => {
    const { userId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.user.singleUser)
    const { setModalType } = useContext(ModalContext)
    const dispatch = useDispatch()
    const posts = useSelector(state => state.post.allPosts)
    const postsArray = Object.values(posts)
    const history = useHistory()


    useEffect(() => {
        console.log("-----------------2", userId)
        dispatch(getUser(userId))
            .then(() => {
                console.log(user)
                dispatch(getUsersPosts(userId))
            })
    }, [])

    const goToProfile = () => {
        dispatch(getUser(currentUser.id))
            .then(() => {
                dispatch(getUsersPosts(currentUser.id))
            })
        history.push(`/users/${currentUser.id}`)
    }

    return (
        <div>
            <NavBar />
            <div id="profile-container" className="">
                <div id="profile-left" className="">
                    <img className="profile-left-icons cursor" onClick={() => history.push("/")} src={homeIcon} />
                    <img className="profile-left-icons cursor" onClick={goToProfile} src={currentUser?.profilePicture ? currentUser?.profilePicture : icon} />
                    <img className="profile-left-icons cursor" onClick={linkedInLink} src={linkedInIcon}/>
                    <img className="profile-left-icons cursor" onClick={githubLink} src={githubIcon}/>
                    <img className="profile-left-icons cursor" onClick={medianLink} src={medianIcon}/>
                    <img className="profile-left-icons cursor" onClick={airzzzLink} src={airzzzIcon}/>
                </div>
                <div id="profile-right" className="">
                    <div id="profile-header-container">
                        <div id="profile-header" className="">
                            <img id="profile-pic" src={user.profilePicture ? user.profilePicture : icon} />
                            <div id="profile-name">{user.firstName} {user.lastName}</div>
                        </div>
                    </div>
                    <div id="profile-body" className="">
                        {/* <div id="profile-body-left" className="">info/friends-etc</div> */}
                        <div id="profile-body-right" className="">
                            <MidSection />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile
