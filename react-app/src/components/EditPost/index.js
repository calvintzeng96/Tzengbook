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
    const [imageLoading, setImageLoading] = useState(false)
    const [imageRemoval, setImageRemoval] = useState("Remove Existing Image")

    useEffect(() => {
        setPostId(post.id)
        dispatch(getSinglePost(postId))
    }, [])

    useEffect(() => {
        setContent(post.content)
        setImage(post.image)
        console.log(post.content)
        console.log(post.image)
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        const formData = new FormData();
        if (imageRemoval == "Existing image removed :)") {
            console.log("pppppppppppppppppp")
            setImage("remove existing image")
            await fetch('/api/posts/checkImage', {
                method: "POST",
                body: image
            })
                .then(() => {
                    console.log("ooooooooooooooooooo")
                    let data = {
                        "image": "remove existing image",
                        content
                    }
                    dispatch(updatePost(postId, data))
                        .then(() => {
                            setModalType(false)
                        })
                })

        }
        formData.append("image", image);
        setImageLoading(true);
        await fetch('/api/posts/checkImage', {
            method: "POST",
            body: formData
        })
            .then(async (res) => {
                let imgurl = await res.text()
                if (imgurl.includes("not permitted")) {
                    console.log("*******************1")
                    setErrors(["Only png/jpg/jpeg/gif allowed"])
                    return
                }
                let data = { image: imgurl, content };
                // console.log(imgurl)
                if (imgurl.includes("!DOCTYPE")) {
                    console.log("*******************2")
                    console.log("HERE")
                    data = { content }
                }
                console.log(content)
                dispatch(updatePost(postId, data))
                    .then(() => {
                        setModalType(false)
                    })
            })

        // const data = { image, content };

    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        console.log("99999999999999999999", e.target.files)
        setImage(file);
    }

    const removeImage = () => {
        // setImage("remove existing image")
        setImageRemoval("Existing image removed :)")
    }

    return (
        <form className="form-container modal-content" onSubmit={submit}>
            <div>Edit Post</div>
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
                type="file"
                accept="image/*"
                onChange={updateImage}
            />
            <div className="cursor" onClick={() => removeImage()}>{imageRemoval}</div>
            <button type="submit">Post</button>
        </form>
    )

}

export default EditPost
