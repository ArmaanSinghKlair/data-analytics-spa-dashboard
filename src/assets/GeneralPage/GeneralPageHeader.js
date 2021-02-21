import React from 'react'
import {controls} from './controls'

function GeneralPageHeader({positiveMetrics, metrics, chartDispatch, curChart, charts,curChartData,numericMetrics}) {
   
    // Developing components dynamically according to the current chart passed as props    
    let Control =()=><div></div>
    if(curChart != null){
        Control = controls[charts[curChart]]
    }
    return (
        <div className="generalpage__pageheader">
            {
                <Control chartDispatch={chartDispatch} curChartData={curChartData} metrics={metrics} positiveMetrics={positiveMetrics} numericMetrics={numericMetrics}/>
            }
        </div>
    )
}

export default GeneralPageHeader