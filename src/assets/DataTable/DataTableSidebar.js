import React ,{useCallback, memo}from 'react'
import '../stylesheets/DataTableSidebar.css';
import SidebarOption from '../SidebarOption'
import {Link} from 'react-router-dom'

function DataTableSidebar({curUrl, setUrl, urls}) {
    const getUrlName = useCallback((text)=>{
        return text.substring(0,text.indexOf("-"))
    },[])

    return (
        <div className="datatable__sidebar flex flex-column">
            <Link to="/">
                <SidebarOption iconText="arrow_back_ios" headerText="Select API" handleClick={null} iconText="arrow_back_ios" onClick={()=>{window.location.replace(window.location.origin)}}  />
            </Link>
            {
                urls.map((url,i)=>(
                    <SidebarOption iconText="link" headerText={getUrlName(url)} handleClick={()=>setUrl(i)} selected={curUrl===i?true:false} key={i}/>
                ))
            }
        </div>
    )
}

export default memo(DataTableSidebar)
