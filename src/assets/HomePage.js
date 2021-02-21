import React, {memo, useMemo} from 'react'
import HomePageOption from './HomePageOption'
import {useRouteMatch} from "react-router-dom"
import './stylesheets/HomePage.css'

function HomePage() {
    const {path,url} = useRouteMatch();
    const links = useMemo(()=>[
        {
            headerText: "general and geo charts",
            linkText:`/general`,
            iconText: "insights"
        },
        {
            headerText: "Data Table",
            linkText:`/datatable`,
            iconText: "table_view"
        }

    ])

    return (
        <div className="homepage__container">
            <h1>Analyse and Compare data</h1>

            <div className="homepage flex flex-row">
            {links.map((link,i)=>(
                <HomePageOption {...link} key={i}/>
            ))}
            </div>
    </div> 
       
    )
}

export default memo(HomePage)
