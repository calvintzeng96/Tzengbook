import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { deletePost, getAllPosts, getSinglePost, getUsersPosts } from "../../store/post";
import ProfileSub from "../ProfileSub";
import { ModalContext } from "../../context/Modal";
import icon from "../../assets/default-profile-icon.png"

import PostComments from "../PostComments";


const MidSection = () => {
    const dispatch = useDispatch();
    const { setModalType } = useContext(ModalContext)
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.user.singleUser)
    const { userId } = useParams()


    const posts = useSelector(state => state.post.allPosts)
    const post = useSelector(state => state.post.singlePost)

    const postsArray = Object.values(posts)

    useEffect(() => {
        if (userId) {
            dispatch(getUsersPosts(userId))
                .then(() => {
                    setIsLoaded(true)
                })
        } else {
            dispatch(getAllPosts())
                .then(() => {
                    setIsLoaded(true)
                })
        }
    }, [post])


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
                {window.location.pathname == "" || currentUser.id == user.id && (

                    <div>
                        <div className="create-comment-div">
                            <img className="cursor" src={user.profilePicture ? user.profilePicture : icon} onClick={() => history.push(`/users/${user.id}`)} />
                            <button className="cursor" onClick={() => setModalType("CreatePost")}>{`What's on your mind, ${currentUser?.firstName}?`}</button>
                        </div>
                    </div>
                )}
                {posts && postsArray.reverse().map(ele => {
                    return (
                        <div key={ele.id} className="single-post">
                            <div className="single-post-top">
                                <ProfileSub ele={ele.User} createdAt={ele.createdAt} />
                                {currentUser.id == ele.userId && (
                                    <div className="edit-delete">
                                        <button className="cursor" onClick={() => openEditModal(ele.id)}>Edit</button>
                                        <button className="cursor" onClick={() => deleteSinglePost(ele.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                            <div className="single-post-content">{ele.content}</div>
                            {ele.image && <img className="post-image" src={ele.image} />}
                            <PostComments ele={ele} />
                        </div>
                    )
                })}
                {Object.values(posts).length == 0 && (
                    <div className="larger-font grey">{user.firstName} currently has no posts</div>
                )}
            </div>
        )
    } else {
        return "loading......"
    }
}

export default MidSection
