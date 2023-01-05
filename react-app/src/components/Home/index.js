import { useDispatch, useSelector } from "react-redux"
import LoginForm from "../auth/LoginForm"
import NavBar from "../NavBar/NavBar"
import GetAllPosts from "../Posts"
import "./index.css"
import LoggedOutFooter from "../LoggedOutFooter"
import { getIncomingRequests, getOutgoingRequests } from '../../store/request';
import { useEffect } from "react"




const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const incoming = useSelector(state => state.request.incoming)
    const outgoing = useSelector(state => state.request.outgoing)
    useEffect(() => {
      console.log("----------------2")
      if (user) {
        dispatch(getIncomingRequests(user.id))
        dispatch(getOutgoingRequests(user.id))
      }
      console.log("----------------3")
    }, [user])


    if (!user) {
        return (
            <div id="home-logged-out">
                <div id="home-logged-out-upper">
                    <div id="home-logged-out-upper-left">
                        <h1 id="home-logged-out-upper-left-1">tzengbook</h1>
                        <p id="home-logged-out-upper-left-2">Connect with friends and the world around you on Tzengbook.</p>
                    </div>
                    <LoginForm />
                </div>
                <div id="home-logged-out-lower">
                    <LoggedOutFooter />
                </div>
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
