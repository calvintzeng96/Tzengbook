import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/post";
import ProfileSub from "../ProfileSub";

const PostComments = ({ ele }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const [dropdown, setDropdown] = useState(false)
    const [number, setNumber] = useState("")

    const [newComment, setNewComment] = useState("")

    // const correctComment = (i) => {
    //     // if () return;
    //     setNumber(i)
    // }

    const commentSubmit = (postId) => {
        let data = { "content": newComment }

        dispatch(createComment(postId, data))
        // .then(() => {
        //     alert("success created comment")
        // })
        // .catch(() => {
        //     alert("failed created comment")
        // })
        return
    }

    useEffect(() => {
        if (!dropdown) return
        document.addEventListener("click", (e) => {
            // let test = document.getElementById("comment-dropdown-button")
            // if (e.target !== test && dropdown) {
                setDropdown(false)
            // }
            // if (dropdown) {
            // }
        })
    })

    const dropdownSetting = () => {
        if (!setDropdown) {
            setDropdown(true)
        }

    }

    return (
        <div>
            <div className="create-comment-container">
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
                                {currentUser.id == comment.user_id && (
                                    <button id="comment-dropdown-button" onClick={() => dropdownSetting()}>---
                                    </button>
                                )}
                                {dropdown && (
                                    <div>
                                        <button>edit</button>
                                        <button>delete</button>
                                    </div>
                                )

                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostComments
