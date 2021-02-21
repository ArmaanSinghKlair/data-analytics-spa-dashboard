import {CHART_REDUCER_OPTIONS} from './GeneralPageChartReducer'
import getData from '../getData'
import React from 'react'

export const controls = {
    //Component htmlFor line chart
    GeneralPageLineChart:({curChartData,chartDispatch,metrics,numericMetrics})=>{
       // console.log("CHAR DATA ")
        //console.log(curChartData)
        return (
            <div className="controls  flex flex-row">
                <div className="control">
                    <label htmlFor="xaxis">X Axis <b>{curChartData?.xAxis ? `(${curChartData?.xAxis})`:''}</b></label>
                    <select onChange={e=>chartDispatch({
                        type: CHART_REDUCER_OPTIONS.EDIT_XAXIS,
                        payload: e.target.value
                    })} name="xaxis" id="xaxis" value={""}>
                        <option>--</option>
                        {
                            //Displays all metrics that are not currently in the x axis
                            metrics?.filter(metric=>{
                                return metric != curChartData?.xAxis;
                            }).map((metric,i)=>{
                                return <option value={metric} key={i}>{metric}</option>
                            })
                        }
                    </select>
                </div>
                <div className="control">
                    <label htmlFor="lines">Add Metric <b>{curChartData?.lines?.length>0 ? `(${curChartData?.lines[curChartData.lines.length-1]})`:''}</b></label>
                    <select name="lines" id="lines" onChange={e=>chartDispatch({
                        type: CHART_REDUCER_OPTIONS.ADD_LINE,
                        payload: e.target.value
                    })} value={""}>
                        <option>--</option>

                        {
                            //Displays all metrics that are not currently in the y axis
                            numericMetrics?.filter(metric=>{
                                return curChartData?.lines?.indexOf(metric) == -1;
                            }).map((metric,i)=>{
                                return <option value={metric} key={i}>{metric}</option>
                            })
                        }
                    </select>
                </div>
                <div className="control">
                    <label htmlFor="removeLines">Remove Metric</label>
                    <select name="removeLines" id="removeLines" onChange={e=>chartDispatch({
                        type: CHART_REDUCER_OPTIONS.REMOVE_LINE,
                        payload: e.target.value
                    })} value={""}>
                        <option>--</option>

                    {
                            //Displays all metrics that are not currently in the y axis
                            curChartData?.lines?.map((metric,i)=>{
                                return <option value={metric} key={i}>{metric}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        )
    },
    //Component htmlFor PIE chart
    GeneralPagePieCharts:({curChartData,chartDispatch,metrics,positiveMetrics})=>{
       /*
       GeneralPagePieCharts:{
            dataKey: '',
            controlsSelected: false
        }
        */
      
        return (
            <div className="controls  flex flex-row">
                <div className="control">
                    <label htmlFor="name">Pie Slice Label <b>{curChartData?.name ? `(${curChartData?.name})`:''}</b></label>
                    <select name="name" id="name" onChange={e=>chartDispatch({
                        type: CHART_REDUCER_OPTIONS.ADD_PIE_NAME,
                        payload: e.target.value
                    })} value={""}>
                        <option>--</option>
                        {
                            //Displays all metrics
                            metrics?.map((metric,i)=>{
                                return <option value={metric} key={i}>{metric}</option>
                            })
                        }
                    </select>
                </div>
                <div className="control">
                    <label htmlFor="lines">Pie Slice Data <b>{curChartData?.value ? `(${curChartData?.value})`:''}</b></label>
                    <select name="lines" id="lines"onChange={e=>chartDispatch({
                        type: CHART_REDUCER_OPTIONS.ADD_PIE_VALUE,
                        payload: e.target.value
                    })}value={""}>
                    <option>--</option>
                        {
                            //Displays all metrics
                            positiveMetrics?.filter(metric=>metric != curChartData.name).map((metric,i)=>{
                                return <option value={metric} key={i}>{metric}</option>
                            })
                        }
                    </select>
                </div>
                <div className="control addpiecharts">
                    <button onClick={()=>chartDispatch({
                            type: CHART_REDUCER_OPTIONS.CREATE_PIE_CHARTS
                        })
                    }>Add</button>
                </div>
                <div className="control clearpiecharts">
                    <button onClick={()=>chartDispatch({
                            type: CHART_REDUCER_OPTIONS.CLEAR_PIE_CHARTS
                        })
                    }>Clear</button>
                </div>
            </div>
        )
    },
    GeneralPageMap:({metrics,curChartData,chartDispatch})=>{
        //Gets all the date names from API
        const [allDates,setAllDates] = React.useState(null)
        React.useEffect(()=>{
         async function getAllDates(){
            let data = await getData("/alldates")
            //console.log(data)
            setAllDates(data)

         }
         getAllDates()
        },[])
        console.log(allDates)
        return (
            <div className="controls  flex flex-row">
                <div className="control">
                    <label htmlFor="metric">Metric to view <b>{curChartData?.curMetric ? `(${curChartData?.curMetric})`:''}</b></label>
                    <select name="metric" id="metric" onChange={e=>chartDispatch({
                        type: CHART_REDUCER_OPTIONS.ADD_MAP_METRIC,
                        payload: e.target.value
                    })}value={""}>
                    <option>--</option>
                        {
                            //Displays all metrics
                            metrics?.filter(metric=>metric != "date").map((metric,i)=>{
                                return <option value={metric} key={i}>{metric}</option>
                            })
                        }
                    </select>
                </div>
                <div className="control">
                    <label htmlFor="dates">Date search <b>{curChartData?.perMetric ? `(${curChartData?.perMetric})`:''}</b></label>
                    <input type="range" min={allDates ? new Date(allDates[0]?.date).valueOf():0} max={allDates?new Date(allDates[allDates.length-1]?.date).valueOf():86400000} step={86400000} onChange={e=>{
                        if( e.target.value >= new Date(allDates[0]?.date).valueOf() && e.target.value <= new Date(allDates[allDates.length-1].date.valueOf())){
                            chartDispatch({
                        type: CHART_REDUCER_OPTIONS.ADD_MAP_DATE,
                        payload: new Date(Number(e.target.value)).toISOString()
                    })}}} />
                
                    
                </div>
                <div className="control addpiecharts">
                    <button onClick={()=>chartDispatch({
                            type: CHART_REDUCER_OPTIONS.VIEW_MAP_METRIC
                        })
                    }>View</button>
                </div>
            </div>
        )
    }
}

 