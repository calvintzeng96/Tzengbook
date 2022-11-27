import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/post";
import ProfileSub from "../ProfileSub";
import { ModalContext } from "../../context/Modal";
import icon from "../../assets/default-profile-icon.png"


import "./index.css"




const GetAllPosts = () => {
    const dispatch = useDispatch();
    const { setModalType } = useContext(ModalContext)
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user)

    const posts = useSelector(state => state.post.allPosts)
    const post = useSelector(state => state.post.singlePost)

    const postsArray = Object.values(posts)

    useEffect(() => {
        console.log("USE EFFECT RUNNING")
        dispatch(getAllPosts())
            .then(() => {
                console.log("GOT ALL THE POSTS")
                setIsLoaded(true)
            })
            .catch(() => {
                alert("err")
            })
    }, [post])

    if (isLoaded) {
        return (
            // <div>
            //     <h1>Posts</h1>
            <div id="all-post-container">
                <div id="all-post-left">
                    <div className="all-post-left-contents border cursor">
                        <img src={icon}/>
                        <div onClick={() => history.push("/")}>Home</div>
                    </div>
                    <div onClick={() => history.push(`/users/${user.id}`)} className="all-post-left-contents border cursor">
                        <img src={user.profilePicture ? user.profilePicture : icon} />
                        <div>{user.firstName} {user.lastName}</div>
                    </div>
                </div>
                <div id="all-post-middle">
                    <div onClick={() => setModalType("CreatePost")}>
                        <div id="create-comment-div">
                            <img src={icon} />
                            <button className="cursor" onClick={() => setModalType("CreatePost")}>{`What's on your mind, ${user.firstName}?`}</button>
                        </div>
                    </div>
                    {posts && postsArray.map(ele => {
                        return (
                            <div key={ele.id} className="single-post">
                                <div className="single-post-top">
                                    <ProfileSub ele={ele.User} createdAt={ele.createdAt} />
                                    <div>placeholder</div>
                                </div>
                                <div className="single-post-content">POST CONTENT: {ele.content} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
                                {ele.image && <img src={ele.image} />}
                                <div>comments for later</div>
                            </div>
                        )
                    })}
                </div>

                <div id="all-post-right">right</div>
            </div>
        )
    } else {
        return "loading......"
    }
}

export default GetAllPosts
