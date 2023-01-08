import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import { createRequest, deleteRequest, getOutgoingRequests } from "../../store/request"
import { useState } from "react"
import { deleteFriend, createFriend } from "../../store/friend"

const FriendshipOption = ({ status, userId }) => {
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const incoming = useSelector(state => state.request.incoming)
    const outgoing = useSelector(state => state.request.outgoing)
    const [unfriendButton, setUnfriendButton] = useState(false)
    const [respondButton, setRespondButton] = useState(false)

    const addFriend = (userId) => {
        dispatch(createRequest(userId))
            .then(() => {
                dispatch(getOutgoingRequests(currentUser.id))
                alert("Friendship Requested")
            })
            .catch(() => {
                alert("failed1")
            })
    }

    const option3Button = () => {
        unfriendButton ? setUnfriendButton(false) : setUnfriendButton(true)
    }
    const unfriend = (userId) => {
        setUnfriendButton(false)
        dispatch(deleteFriend(currentUser.id, userId))
        .then(() => {
            alert("Successfully Unfriended")
        })
        .catch(() => {
            alert("failed3")
        })
    }

    const cancelRequest = (userId) => {
        dispatch(deleteRequest(currentUser.id, userId))
            .then(() => {
                alert("Successfully Canceled Friend Request")
            })
            .catch(() => {
                alert("failed4")
            })
    }

    const option5Button = () => {
        respondButton ? setRespondButton(false) : setRespondButton(true)
    }
    const acceptRequest = (myId, userId) => {

        dispatch(createFriend(myId, userId))
          .then(() => {
            dispatch(deleteRequest(myId, userId))
          })
      }
      const declineRequest = (myId, userId) => {
        dispatch(deleteRequest(myId, userId))
      }

    return (
        <div id="friendship-option-container">
            {status === "not friends" && !(incoming[userId]) && !(outgoing[userId]) && (
                <div id="friendship-option-1" className="friendship-option-all">
                    <button onClick={() => addFriend(userId)} id="friendship-option-1-1" className="cursor">Add Friend</button>
                </div>
            )
            }
            {status === "myself" && (
                <div id="friendship-option-2" className="friendship-option-all">
                </div>
            )
            }
            {status === "friends" && (
                <div id="friendship-option-3" className="friendship-option-all">
                    <button onClick={() => option3Button()} id="friendship-option-3-1" className="cursor">Friends</button>
                    {unfriendButton && (
                        <div onClick={() => unfriend(userId)} id="friendship-option-3-dropdown" className="cursor">Unfriend</div>
                    )}

                </div>

            )
            }
            {outgoing[userId] && (
                <div id="friendship-option-4" className="friendship-option-all">
                    <button onClick={() => cancelRequest(userId)} id="friendship-option-4-1" className="cursor">Cancel Request</button>
                </div>
            )
            }
            {incoming[userId] && (
                <div id="friendship-option-5" className="friendship-option-all">
                    <button onClick={() => option5Button()} id="friendship-option-5-1" className="cursor">Respond</button>
                    {respondButton && (
                        <div id="friendship-option-5-dropdown">
                            <div onClick={() => acceptRequest(currentUser.id, userId)} className="cursor friendship-option-5-dropdown-options">Accept</div>
                            <div onClick={() => declineRequest(currentUser.id, userId)} className="cursor friendship-option-5-dropdown-options">Decline</div>
                        </div>
                    )}
                </div>

            )
            }
        </div>
    )
}
export default FriendshipOption
