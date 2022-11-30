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
        console.log("-----------------", userId)
        dispatch(getUser(userId))
            .then(() => {
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
                    <img className="test cursor" onClick={() => history.push("/")} src={homeIcon} />
                    <img className="test cursor" onClick={goToProfile} src={user.profilePicture ? user.profilePicture : icon} />
                </div>
                <div id="profile-right" className="">
                    <div id="profile-header-container">
                        <div id="profile-header" className="">
                            <img id="profile-pic" src={icon} />
                            <div id="profile-name">{user.firstName} {user.lastName}</div>
                        </div>
                    </div>
                    <div id="profile-body" className="">
                        {/* <div id="profile-body-left" className="">info/friends-etc</div> */}
                        <div id="profile-body-right" className="">

                            <div id="all-post-middle">
                                <div onClick={() => setModalType("CreatePost")}>
                                    <div className="create-comment-div">
                                        <img src={icon} />
                                        <button className="cursor" onClick={() => setModalType("CreatePost")}>{`What's on your mind, ${currentUser?.firstName}?`}</button>
                                    </div>
                                </div>
                                {posts && postsArray.map(ele => {
                                    return (
                                        <div key={ele.id} className="single-post">
                                            <div className="single-post-top">
                                                <ProfileSub ele={ele.User} createdAt={ele.createdAt} />
                                                {currentUser?.id == ele.userId && (
                                                    <div>Edit</div>
                                                )}
                                            </div>
                                            <div className="single-post-content">POST CONTENT: {ele.content} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
                                            {ele.image && <img className="post-image" src={ele.image} />}
                                            <div>comments for later</div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile
