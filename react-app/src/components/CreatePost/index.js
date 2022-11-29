import { useDispatch, useSelector } from "react-redux"
import ProfileSub from "../ProfileSub";
import { createPost } from "../../store/post";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/Modal"
import { useEffect } from "react";


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

                const data = { image: imgurl, content };

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
        <form className="form-container modal-content" onSubmit={submit}>
            <ProfileSub ele={currentUser} />
            <div className="errors">
                {errors.length > 0 &&
                    errors.map((ele) => <div>{ele}</div>)}
            </div>

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
            <button type="submit">Post</button>
        </form>
    )

}

export default CreatePost
