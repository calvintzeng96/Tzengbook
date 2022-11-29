import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { createComment, deletePost, getAllPosts, getSinglePost } from "../../store/post";
import ProfileSub from "../ProfileSub";
import { ModalContext } from "../../context/Modal";
import icon from "../../assets/default-profile-icon.png"


import "./index.css"
import { getUser } from "../../store/user";
import PostComments from "../PostComments";



const GetAllPosts = () => {
    const dispatch = useDispatch();
    const { setModalType } = useContext(ModalContext)
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.user.singleUser)

    //comment stuff
    // const [newComment, setNewComment] = useState("")

    // const commentSubmit = (postId) => {
    //     let data = {"content": newComment}

    //     dispatch(createComment(postId, data))
    //     .then(() => {
    //         alert("success created comment")
    //     })
    //     .catch(() => {
    //         alert("failed created comment")
    //     })
    //     return
    // }

    //-----------


    const posts = useSelector(state => state.post.allPosts)
    const post = useSelector(state => state.post.singlePost)

    const postsArray = Object.values(posts)

    useEffect(() => {
        dispatch(getAllPosts())
            .then(() => {
                setIsLoaded(true)
                dispatch(getUser(currentUser.id))
            })
        // .catch(() => {
        //     alert("err")
        // })
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



    if (isLoaded) {
        return (
            // <div>
            //     <h1>Posts</h1>
            <div id="all-post-container">
                <div id="all-post-left">
                    <div className="all-post-left-contents border cursor">
                        <img src={icon} />
                        <div onClick={() => history.push("/")}>Home</div>
                    </div>
                    <div onClick={() => history.push(`/users/${user.id}`)} className="all-post-left-contents border cursor">
                        <img src={user.profilePicture ? user.profilePicture : icon} />
                        <div>{user.firstName} {user.lastName}</div>
                    </div>
                </div>
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
                                        <div>
                                            <button onClick={() => openEditModal(ele.id)}>Edit</button>
                                            <button onClick={() => deleteSinglePost(ele.id)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                                <div className="single-post-content">POST CONTENT: {ele.content} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
                                {/* {console.log(ele.image)} */}
                                {ele.image && <img className="post-image" src={ele.image} />}
                                <PostComments ele={ele} />
                                {/* <div className="create-comment-container">
                                    <ProfileSub ele={currentUser} />
                                    <form onSubmit={() => commentSubmit(ele.id)}>
                                        <input
                                            type="text"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Write a comment..."
                                        />
                                        <button type="submit">submit</button>
                                    </form>
                                </div>

                                <div>
                                    {
                                        ele.Comments.map(comment => {
                                            return (
                                                <div className="individual-comment border">
                                                    <ProfileSub ele={comment.user} />
                                                    <div>{comment.content}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> */}
                            </div>
                        )
                    })}
                </div>

                <div id="all-post-right">right</div>
            </div >
        )
    } else {
        return "loading......"
    }
}

export default GetAllPosts
