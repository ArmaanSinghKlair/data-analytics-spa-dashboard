import React from 'react'

function GeneralPageChart({onClick, chart, curChart}) {
    const icons = {
        GeneralPageLineChart:{
            iconText: "multiline_chart",
            headerText: "Line"
    },
    GeneralPagePieCharts:{
        iconText: "pie_chart",
        headerText: "Pie"
},
    GeneralPageMap:{
        iconText: "terrain",
        headerText: "Map"
    }}
    return (
        <div className={`generalpage__chart__link ${curChart?'curChart':''} flex flex-column`} onClick={onClick}>
                <i className="material-icons">
                    {icons[chart]?.iconText}
                </i> 
                <span>{icons[chart]?.headerText}</span>       
        </div>
    )
}

export default GeneralPageChart
