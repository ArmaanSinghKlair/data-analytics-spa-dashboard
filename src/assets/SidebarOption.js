import React ,{memo}from 'react'
import './stylesheets/SidebarOption.css'
function SidebarOption({headerText, handleClick, iconText, selected}) {
    return (
        <div className={`sidebaroption flex flex-row ${selected && "selected"} selectable`} onClick={handleClick}>
            <span className="material-icons">
                {iconText}
            </span>
            <span>{headerText}</span>
        </div>
    )
}

export default memo(SidebarOption)
