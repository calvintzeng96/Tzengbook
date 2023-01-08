import "./index.css"
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


    const searchFetch = (data) => {
        dispatch(search(data))
            .then((res) => {
                setRes(res.results)
            })
    }

    const debounceTest = useCallback(debounce((data) => searchFetch(data), 300), [])

    useEffect(() => {
        return () => {
            debounceTest.cancel();
        }
    }, [debounceTest]);
    useEffect(() => {
        let data = content.replaceAll(" ", "")
        if (data) {
            debounceTest(data)
        } else {
            setRes([])
        }
    }, [content, debounceTest])

    const goToProfile = (userId) => {
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
                        <div
                            className="search-results-container cursor"
                            onMouseDown={(e) => {
                                e.preventDefault()
                            }}
                        >
                            {res.map(ele => {
                                return (
                                    <div key={ele.id} className="search-individual-results" onClick={() => goToProfile(ele.id)}>
                                        <img className="search-image" src={ele.profilePicture} alt="profile"/>
                                        <div className="search-individual-results-name">{ele.fullName}</div>
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
