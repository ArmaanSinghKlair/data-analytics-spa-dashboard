import React,{useReducer,useMemo,useEffect} from 'react'
import '../stylesheets/GeneralPageMainPage.css'
import GeneralPageHeader from './GeneralPageHeader'
import GeneralPageCharts from './GeneralPageCharts'
import {CHART_REDUCER_OPTIONS,chartReducer} from './GeneralPageChartReducer'

function GeneralPageMainPage({dataSet,curChart,charts,url}) {
    const metrics =   useMemo(()=>{
       if(dataSet != null && dataSet.length > 0)
        return Object.keys(dataSet[0])
       else
        return null 
    }, [dataSet]);

    const chartData = {
        GeneralPageLineChart:{
            xAxis: null,
            lines: [],
            controlsSelected: false
        },
        GeneralPagePieCharts:{
            value: null,
            name: null,
            keyValuePairs:[],
            controlsSelected: false
        },
        GeneralPageMap:{
            markerLocations:[],
            markerData:[],
            perMetric:null,
            curMetric:null,
            controlsSelected: false
        }

    }

     //Getting metrics with positive values only, no strings for dropdowns to use
     const positiveMetrics = useMemo(()=>{
        if(dataSet==null || dataSet?.length <= 0)
            return null;
        let metrics = Object.keys(dataSet[0])
        for(let metric in metrics){
            if(typeof dataSet[0][metrics[metric]] !=="number" || !dataSet.every((data)=>{
                return data[metrics[metric]] > 0
            })){
                metrics.splice(metrics.indexOf(metrics[metric]),1)
            }
        }
        return metrics
    })

    //Getting metrics with positive values only, no strings for dropdowns to use
    const numericMetrics = useMemo(()=>{
        if(dataSet==null || dataSet?.length <= 0)
            return null;
        let metrics = Object.keys(dataSet[0])
        for(let metric in metrics){
            if(typeof dataSet[0][metrics[metric]] !=="number"){
                metrics.splice(metrics.indexOf(metrics[metric]),1)
            }
        }
        return metrics
    })

    const [curChartData, chartDispatch] = useReducer(chartReducer,{})
    //So that template for chart data changes whenever curChart changes
    useEffect(()=>{
        chartDispatch({
            type: CHART_REDUCER_OPTIONS.CHANGE_TEMPLATE,
            payload:chartData[charts[curChart]]
        })
    },[curChart,dataSet])
   
    return (
        <div className="generalpage__mainpage flex flex-column">
            <GeneralPageHeader metrics={metrics} curChartData={curChartData} curChart={curChart} chartDispatch={chartDispatch} charts={charts} positiveMetrics={positiveMetrics} numericMetrics={numericMetrics}/>
            <GeneralPageCharts dataSet={dataSet} curChart={curChart} curChartData={curChartData} charts={charts} url={url}/>
        </div>
    )
}

export default GeneralPageMainPage
