import { useDispatch, useSelector } from "react-redux"
import ProfileSub from "../ProfileSub";
import { createPost } from "../../store/post";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/Modal"
import { useEffect } from "react";
import "./index.css"


const CreatePost = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const wall = useSelector(state => state.user.singleUser)
    // const post = useSelector(state => state.post.singlePost)
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [wallId, setWallId] = useState("")
    const [errors, setErrors] = useState([]);
    const { setModalType } = useContext(ModalContext)
    const [imageLoading, setImageLoading] = useState(false)


    useEffect(() => {
        if (window.location.pathname == "/") {
            setWallId(currentUser.id)
        } else {
            setWallId(wall.id)
        }
    }, [wall])

    useEffect(() => {
        setErrors([])
    }, [image])

    const submit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        const formData = new FormData();
        formData.append("image", image);
        setImageLoading(true);
        await fetch('/api/users', {
            method: "POST",
            body: formData
        })
            .then(async (res) => {
                let imgurl = await res.text()
                if (imgurl.includes("not permitted")) {
                    setErrors(["Only png/jpg/jpeg/gif allowed"])
                    return
                }
                let data = { image: imgurl, content };
                // console.log(imgurl)
                if (imgurl.includes("!DOCTYPE")) {
                    console.log("HERE")
                    data = { content }
                }

                dispatch(createPost(wallId, data))
                    .then(() => {
                        setModalType(false)
                        alert("success")
                    })
                    .catch(() => {
                        alert("failed")
                    })
            })
    };



    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }


    return (
        <form id="create-post-form" className="form-container modal-content" onSubmit={submit}>
            <div id="create-post-title">Create Post</div>
            <div className="create-post-content"
>
            <ProfileSub ele={currentUser} />
            </div>
            <div className="errors">
                {errors.length > 0 &&
                    errors.map((ele) => <div>{ele}</div>)}
            </div>

            <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`What's on your mind, ${currentUser.firstName}?`}
                className="create-post-content"
                id="create-post-textarea"
            />
            <label id="test00" for="create-post-image-input" className="create-post-content cursor">Click Here To Add Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={updateImage}
                className="create-post-content"
                id="create-post-image-input"
                hidden
            />
            {image && (
                <div id="create-post-image-name">{image.name}</div>
            )}
            <button
                id={!content ? "create-post-submit-false" : "create-post-submit"}
                className={!content ? "create-post-content not-allowed" : "create-post-content cursor"}
                disabled={!content}
                type="submit">
                Post
            </button>
        </form>
    )

}

export default CreatePost
