import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { deletePost, getSinglePost, getUsersPosts2, getFeed } from "../../store/post";
import ProfileSub from "../ProfileSub";
import { ModalContext } from "../../context/Modal";
import icon from "../../assets/default-profile-icon.png"
import "./index.css"
import PostComments from "../PostComments";
import Likes from "../Likes";

const MidSection = () => {
    const dispatch = useDispatch();
    const { setModalType } = useContext(ModalContext)
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.user.singleUser)
    const { userId } = useParams()
    const friendsList = useSelector(state => state.friend.allFriends)
    const [friendship, setFriendship] = useState(false)


    const posts = useSelector(state => state.post.allPosts)
    const post = useSelector(state => state.post.singlePost)

    const postsArray = Object.values(posts)

    useEffect(() => {
        setFriendship(false)
        if (userId) {
            if (friendsList[currentUser.id]) {
                setFriendship(true)
            }
            setIsLoaded(true)
        } else {
            dispatch(getFeed(currentUser.id))
                .then(() => {
                    setIsLoaded(true)
                })
        }
    }, [friendsList])


    const openEditModal = (postId) => {
        dispatch(getSinglePost(postId))
            .then(() => {
                setModalType("EditPost")
            })
    }

    const deleteSinglePost = (postId) => {
        dispatch(deletePost(postId))
    }
    if (isLoaded && currentUser) {
        return (
            <div id="all-post-middle">
                {(window.location.pathname === "/" || currentUser.id === user.id || friendship) && (
                    <div>
                        <div className="create-comment-div">
                            <img className="cursor" src={currentUser.profilePicture ? currentUser.profilePicture : icon} onClick={() => history.push(`/users/${user.id}`)} alt="profile icon" />
                            <button className="cursor" onClick={() => setModalType("CreatePost")}>{`What's on your mind, ${currentUser?.firstName}?`}</button>
                        </div>
                    </div>
                )}
                {posts && postsArray.reverse().map(ele => {
                    let poster = ele.userId
                    let postee = ele.wallId
                    let target;
                    if (poster !== postee) {
                        let name = ele.Target_Name
                        target = `${postee}/${name}`
                    } else {
                        target = 0
                    }
                    return (
                        <div key={ele.id} className="single-post">
                            <div className="single-post-top">
                                <ProfileSub target={target} ele={ele.User} createdAt={ele.createdAt} />
                                {currentUser.id === ele.userId && (
                                    <div className="edit-delete">
                                        <button className="cursor" onClick={() => openEditModal(ele.id)}>Edit</button>
                                        <button className="cursor" onClick={() => deleteSinglePost(ele.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                            <div id="single-post-content">{ele.content}</div>
                            {ele.image && <img className="post-image" src={ele.image} alt="post" />}

                            <Likes post={ele} />

                            <PostComments ele={ele} />
                        </div>
                    )
                })}
                {Object.values(posts).length === 0 && (
                    <div className="larger-font grey">{user.firstName} currently has no posts</div>
                )}
            </div>
        )
    } else {
        return "loading......"
    }
}

export default MidSection
