import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { createComment, deletePost, getAllPosts, getSinglePost, getUsersPosts } from "../../store/post";
import ProfileSub from "../ProfileSub";
import { ModalContext } from "../../context/Modal";
import { linkedInLink, githubLink, airzzzLink, medianLink } from "../../assets/helper";
//image icons
import icon from "../../assets/default-profile-icon.png"
import homeIcon from "../../assets/home-icon.png"
import linkedInIcon from "../../assets/linkedin-logo.png"
import githubIcon from "../../assets/github-logo.svg"
import airzzzIcon from "../../assets/airzzz-icon.png"
import medianIcon from "../../assets/median-icon.png"

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
        // dispatch(getUsersPosts(currentUser.id))
        dispatch(getAllPosts())
            .then(() => {
                setIsLoaded(true)
                // maybe take out getUser dispatch
                // dispatch(getUser(currentUser.id))
            })
    }, [post])




    if (isLoaded) {
        return (
            <div id="all-post-container">
                <div id="all-post-left">
                    <div className="all-post-left-contents cursor">
                        <img src={homeIcon} />
                        <div onClick={() => history.push("/")}>Home</div>
                    </div>
                    <div onClick={() => history.push(`/users/${currentUser.id}`)} className="all-post-left-contents cursor">
                        <img src={currentUser.profilePicture ? currentUser.profilePicture : icon} />
                        <div>{currentUser.firstName} {currentUser.lastName}</div>
                    </div>
                    <div className="spacer"></div>
                    <div onClick={linkedInLink} className="all-post-left-contents cursor">
                        <img src={linkedInIcon} />
                        <div>LinkedIn</div>
                    </div>
                    <div onClick={githubLink} className="all-post-left-contents cursor">
                        <img src={githubIcon} />
                        <div>Github</div>
                    </div>
                    <div onClick={airzzzLink} className="all-post-left-contents cursor">
                        <img src={airzzzIcon} />
                        <div>AirZzz</div>
                    </div>
                    <div onClick={medianLink} className="all-post-left-contents cursor">
                        <img src={medianIcon} />
                        <div>Median</div>
                    </div>
                </div>

                <MidSection />

                <div id="all-post-right"></div>
            </div >
        )
    } else {
        return "loading......"
    }
}

export default GetAllPosts
