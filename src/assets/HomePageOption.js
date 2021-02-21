import React ,{memo}from 'react'
import {Link} from "react-router-dom"
import "./stylesheets/HomePageOption.css"

function HomePageOption({headerText, iconText, linkText}) {
    return (
            <div className="homepage__option flex flex-column">
                <i className="material-icons">
                    {iconText}
                </i>
                <hr/>
                <h1>{headerText}</h1>
                <Link to={linkText} className="go">Try</Link>
            </div>
    )
}

export default memo(HomePageOption)
