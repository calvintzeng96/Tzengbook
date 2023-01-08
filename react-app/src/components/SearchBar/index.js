import "./index.css"
import { csrfFetch } from "../../store/csrf"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { search } from "../../store/fetch"
import { useHistory } from "react-router-dom"
import debounce from "lodash.debounce"


const SearchBar = () => {
    const dispatch = useDispatch()
    const [content, setContent] = useState("")
    const [res, setRes] = useState([])
    const [active, setActive] = useState(false)
    const history = useHistory()

    useEffect(() => {
        return () => {
            debounceTest.cancel();
        }
    }, []);

    const searchFetch = (data) => {
        dispatch(search(data))
            .then((res) => {
                setRes(res.results)
                console.log("===================12321")
            })
    }

    const debounceTest = useCallback(
        debounce((data) => searchFetch(data), 200)
        , [])

    //getting results from search
    useEffect(() => {
        let data = content.replaceAll(" ", "")
        if (data) {
            debounceTest(data)
            // searchFetch(data)
        } else {
            setRes([])
        }
    }, [content])

    //checks to see if search bar active => show/unshow results
    // useEffect(() => {

    // })
    const goToProfile = (userId) => {
        console.log("=================0")
        history.push(`/users/${userId}`)
        let input = document.getElementById("search-bar-input")
        setActive(false)
        input.blur()
        setContent("")
    }

    return (
        <div id="search-container">
            <div id="search-icon">
                <i className="fa-brands fa-searchengin fa-lg"></i>
            </div>

            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={"Search for Friends"}
                id="search-bar-input"
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                autoComplete="off"
            />
            {active && (
                <div id="search-dropdown-container">
                    {res.length ?
                        // <div>test</div>

                        <div
                            className="search-results-container cursor"
                            onMouseDown={(e) => {
                                e.preventDefault()
                            }}
                        >
                            {res.map(ele => {
                                return (
                                    <div key={ele.id} className="search-individual-results">
                                        <img className="search-image" src={ele.profilePicture} />
                                        <div className="search-individual-results-name" onClick={() => goToProfile(ele.id)}>{ele.fullName}</div>
                                    </div>
                                )
                            })}
                        </div>

                        :

                        <div className="search-results-container"
                        >
                            <div className="search-individual-results">
                                <div className="search-individual-results-name">No Results</div>
                            </div>
                        </div>
                    }
                </div>
            )}

        </div>
    )
}
export default SearchBar
