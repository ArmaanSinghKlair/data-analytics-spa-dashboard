import React, {memo,useMemo} from 'react'
import GeneralPageLineChart from './GeneralPageLineChart'
import GeneralPagePieCharts from './GeneralPagePieCharts'
import GeneralPageMap from './GeneralPageMap'

function GeneralPageCharts({dataSet,curChart, curChartData,charts,url}) {
   
    const components = {
        GeneralPageLineChart:(props)=>{
            return <GeneralPageLineChart {...props} />
        },
        GeneralPagePieCharts:(props)=>{
            return <GeneralPagePieCharts {...props} />
        },
        GeneralPageMap:(props)=>{
            return <GeneralPageMap {...props} />
        }

    }

    let Chart = components[charts[curChart]]
    if(dataSet == null || dataSet.length==0){   // No data fetched yet
        return (
            <span className="material-icons loader">
                hourglass_empty
            </span>
            
            )
    } else if(typeof curChartData == "undefined"){   // No data fetched yet
        return (
            <div className="centered flex flex-row no-search-results">
                <span className="material-icons">
                    info
                </span> 
                <span>Controls need to be selected first</span>
            </div>
            
            )
    }else if(curChartData.controlsSelected === false){   // Controls invalid
        return (
            <div className="centered flex flex-row no-search-results">
                <span className="material-icons">
                    info
                </span> 
                <span>All Controls need to be selected first</span>
            </div>
            
            )
    }else {
        return (
            <div className="generalpage__chart">
                <Chart {...curChartData} dataSet={dataSet} url={url} />
            </div>
        )
    }
}

export default memo(GeneralPageCharts)
