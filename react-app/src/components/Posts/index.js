import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/post";
import { linkedInLink, githubLink, airzzzLink, medianLink } from "../../assets/helper";
import icon from "../../assets/default-profile-icon.png"
import homeIcon from "../../assets/home-icon.png"
import linkedInIcon from "../../assets/linkedin-logo.png"
import githubIcon from "../../assets/github-logo.svg"
import airzzzIcon from "../../assets/airzzz-icon.png"
import medianIcon from "../../assets/median-icon.png"

import "./index.css"

import MidSection from "../MidSection";



const GetAllPosts = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const currentUser = useSelector(state => state.session.user)


    const post = useSelector(state => state.post.singlePost)

    useEffect(() => {
        dispatch(getAllPosts())
            .then(() => {
                setIsLoaded(true)
            })
    }, [post])




    if (isLoaded) {
        return (
            <div id="all-post-container">
                <div id="all-post-left">
                    <div className="all-post-left-contents cursor">
                        <img src={homeIcon} alt="home icon" />
                        <div onClick={() => history.push("/")}>Home</div>
                    </div>
                    <div onClick={() => history.push(`/users/${currentUser.id}`)} className="all-post-left-contents cursor">
                        <img src={currentUser.profilePicture ? currentUser.profilePicture : icon} alt="profile icon" />
                        <div>{currentUser.firstName} {currentUser.lastName}</div>
                    </div>
                    <div className="spacer"></div>
                    <div onClick={linkedInLink} className="all-post-left-contents cursor">
                        <img src={linkedInIcon} alt="linkedin icon" />
                        <div>LinkedIn</div>
                    </div>
                    <div onClick={githubLink} className="all-post-left-contents cursor">
                        <img src={githubIcon} alt="github icon" />
                        <div>Github</div>
                    </div>
                    <div onClick={airzzzLink} className="all-post-left-contents cursor">
                        <img src={airzzzIcon} alt="airzzz icon" />
                        <div>AirZzz</div>
                    </div>
                    <div onClick={medianLink} className="all-post-left-contents cursor">
                        <img src={medianIcon} alt="median icon" />
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
