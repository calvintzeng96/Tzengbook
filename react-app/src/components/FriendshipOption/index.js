const FriendshipOption = ({status, userId}) => {
    //5 possible status passed down=> "not friends"|"friends"|"myself"|"outgoingrequest"|"incomingrequest"
    return (
        <button>{status} {userId}</button>
    )
}
export default FriendshipOption
