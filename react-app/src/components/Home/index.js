import { useSelector } from "react-redux"
import LoginForm from "../auth/LoginForm"
import NavBar from "../NavBar/NavBar"
import GetAllPosts from "../Posts"






const Home = () => {

    const user = useSelector(state => state.session.user)


    if (!user) {
        return (
            <div>
                <div>
                    <div>
                        <h1>facebook</h1>
                        <p>Connect with friends and the world around you on Facebook</p>
                    </div>
                    <LoginForm />
                </div>
                <div>BOTTOM FOOTER AT HOME-LOGGED OUT</div>
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
