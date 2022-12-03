import "./index.css"
import { linkedInLink, githubLink, airzzzLink, medianLink } from "../../assets/helper"

const LoggedOutFooter = () => {


    return (
        <div id="logged-out-footer-container">
            <div id="logged-out-footer-1">
                <div onClick={() => linkedInLink()} className="cursor links">LinkedIn</div>
                <div onClick={() => githubLink()} className="cursor links">Github</div>
            </div>
            <div id="logged-out-footer-2">
                <div>Python</div>
                <div>Flask</div>
                <div>React</div>
                <div>Redux</div>
                <div>JavaScript</div>
                <div>Express</div>
                <div>SQL</div>
                <div>SQLAlchemy</div>
                <div>Docker</div>
                <div>Node</div>
                <div>Github</div>
                <div>HTML</div>
                <div>CSS</div>
            </div>
            <div id="logged-out-footer-3">
                <div>Other Projects:</div>
                <div onClick={() => airzzzLink()} className="other-projects-content cursor links">Airzzz</div>
                <div onClick={() => medianLink()} className="other-projects-content cursor links">Median</div>
            </div>
            <div id="logged-out-footer-4">Calvin Tzeng ©</div>
        </div>
    )
}

export default LoggedOutFooter
