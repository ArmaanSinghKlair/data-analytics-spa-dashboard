import React from 'react'
import GeneralPageChart from './GeneralPageChart'
import '../stylesheets/GeneralPageChartSelector.css'

function GeneralPageChartSelector({curChart,setCurChart,charts}) {
    //console.log(charts)
    return (
        <div className="generalpage__chartselector flex flex-column">
            {charts?.map((chart,i)=>{
                return (
                    <GeneralPageChart chart={chart} onClick={()=>setCurChart(i)} curChart={i==curChart?true:false} key={i}/>
                )
            })
            }
        </div>
    )
}

export default GeneralPageChartSelector
