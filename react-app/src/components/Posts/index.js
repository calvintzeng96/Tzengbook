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
import MidSection from "../MidSection";



const GetAllPosts = () => {
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
        // .catch(() => {
        //     alert("err")
        // })
    }, [post])




    if (isLoaded) {
        return (
            // <div>
            //     <h1>Posts</h1>
            <div id="all-post-container">
                <div id="all-post-left">
                    <div className="all-post-left-contents cursor">
                        <img src={icon} />
                        <div onClick={() => history.push("/")}>Home</div>
                    </div>
                    <div onClick={() => history.push(`/users/${user.id}`)} className="all-post-left-contents cursor">
                        <img src={user.profilePicture ? user.profilePicture : icon} />
                        <div>{user.firstName} {user.lastName}</div>
                    </div>
                </div>
                <MidSection />

                <div id="all-post-right">right</div>
            </div >
        )
    } else {
        return "loading......"
    }
}

export default GetAllPosts
