import { useHistory } from "react-router-dom";
import "./index.css"


const SomeUsersFriends = ({ friendsArray }) => {
    const history = useHistory()

    return (
        <div id="some-friends-container">
            {friendsArray.length > 0 && friendsArray.map(ele => {
                return (
                    <div id="some-friends-card" key={ele.id}>
                        <img className="cursor" onClick={() => history.push(`/users/${ele.id}`)} src={ele.profilePicture} alt="friends preview" />
                        <div id="some-friends-name" className="cursor underline-hover" onClick={() => history.push(`/users/${ele.id}`)} >{ele.firstName} {ele.lastName}</div>
                    </div>
                )
            })}
            {friendsArray.length === 0 && (
                <div>CURRENTLY HAVE NO FRIENDS</div>
            )}
        </div>
    )
}
export default SomeUsersFriends
