import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { createComment, deletePost, getAllPosts, getSinglePost } from "../../store/post";
import ProfileSub from "../ProfileSub";
import { ModalContext } from "../../context/Modal";
import icon from "../../assets/default-profile-icon.png"

import PostComments from "../PostComments";
import { getUser } from "../../store/user";


const MidSection = () => {
    const dispatch = useDispatch();
    const { setModalType } = useContext(ModalContext)
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.user.singleUser)


    const posts = useSelector(state => state.post.allPosts)
    const post = useSelector(state => state.post.singlePost)

    const postsArray = Object.values(posts)

    useEffect(() => {
        dispatch(getAllPosts())
            .then(() => {
                setIsLoaded(true)
                dispatch(getUser(currentUser.id))
            })
    }, [post])


    const openEditModal = (postId) => {
        dispatch(getSinglePost(postId))
            .then(() => {
                setModalType("EditPost")
                // setModalType(null)
            })
    }

    const deleteSinglePost = (postId) => {
        dispatch(deletePost(postId))
            .then(() => {
                alert("successfully deleted")
            })
            .catch(() => {
                alert("delete failed.......")
            })
    }

    if (isLoaded && currentUser) {
        return (
            <div id="all-post-middle">
                <div>
                    <div className="create-comment-div">
                        <img src={icon} onClick={() => history.push(`/users/${user.id}`)} />
                        <button className="cursor" onClick={() => setModalType("CreatePost")}>{`What's on your mind, ${currentUser?.firstName}?`}</button>
                    </div>
                </div>
                {posts && postsArray.map(ele => {
                    return (
                        <div key={ele.id} className="single-post">
                            <div className="single-post-top">
                                <ProfileSub ele={ele.User} createdAt={ele.createdAt} />
                                {currentUser.id == ele.userId && (
                                    <div className="edit-delete">
                                        <button onClick={() => openEditModal(ele.id)}>Edit</button>
                                        <button onClick={() => deleteSinglePost(ele.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                            <div className="single-post-content">{ele.content}</div>
                            {/* {console.log(ele.image)} */}
                            {ele.image && <img className="post-image" src={ele.image} />}
                            <PostComments ele={ele} />
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return "loading......"
    }
}

export default MidSection
