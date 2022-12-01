import { useSelector } from "react-redux"
import LoginForm from "../auth/LoginForm"
import NavBar from "../NavBar/NavBar"
import GetAllPosts from "../Posts"
import "./index.css"
import fbBottom from "../../assets/fb-bottom.png"




const Home = () => {

    const user = useSelector(state => state.session.user)


    if (!user) {
        return (
            <div id="home-logged-out">
                <div id="home-logged-out-upper">
                    <div id="home-logged-out-upper-left">
                        <h1 id="home-logged-out-upper-left-1">tzengbook</h1>
                        <p id="home-logged-out-upper-left-2">Connect with friends and the world around you on Facebook.</p>
                    </div>
                    <LoginForm />
                </div>
                <div id="home-logged-out-lower">
                    <img src={fbBottom} />
                </div>
                {/* <div id="home-logged-out-lower">BOTTOM FOOTER AT HOME-LOGGED OUT</div> */}
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <GetAllPosts />
        </div>
    )
}


export default Home
