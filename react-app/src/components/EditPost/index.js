import { useDispatch, useSelector } from "react-redux"
import ProfileSub from "../ProfileSub";
import { createPost } from "../../store/post";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/Modal"
import { useEffect } from "react";
// import { useParams } from "react-router-dom";

import { getSinglePost, updatePost } from "../../store/post";

const EditPost = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const wall = useSelector(state => state.user.singleUser)
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const { setModalType } = useContext(ModalContext)
    const post = useSelector(state => state.post.singlePost)
    const [postId, setPostId] = useState("")

    useEffect(() => {
        setPostId(post.id)
        dispatch(getSinglePost(postId))
    }, [])

    useEffect(() => {
        setContent(post.content)
        setImage(post.image)
    }, [post])

    const submit = (e) => {
        e.preventDefault();
        setErrors([]);

        const data = { image, content };

        dispatch(updatePost(postId, data))
            .then(() => {
                setModalType(false)
            })
    };

    return (
        <form className="form-container modal-content" onSubmit={submit}>
            <ProfileSub ele={currentUser} />
            {/* <div className="errors">
                {errors.length > 0 &&
                    errors.map((error) => <li key={error}>{error}</li>)}
            </div> */}

            <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`What's on your mind, ${currentUser.firstName}?`}
            />
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image url"
            />
            <button type="submit">Post</button>
        </form>
    )

}

export default EditPost
