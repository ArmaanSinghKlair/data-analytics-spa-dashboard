import React,{memo,useEffect, useState,useMemo,useCallback} from 'react'
import GeneralPageSidebar from './GeneralPageSidebar'
import GeneralPageMainPage from './GeneralPageMainPage'
import GeneralPageChartSelector from './GeneralPageChartSelector'
import getData from '../getData'
import '../stylesheets/GeneralPage.css'

function GeneralPage() {

    //Data set fetched will be placed here
    const [dataSet,setDataSet] = useState(null)
    const getUrl = useCallback((text)=>{
        return text.substring(text.indexOf("-")+1)
    },[])

    //URLS for different types of charts
    const urls = useMemo(()=>{
        return {
        GeneralPageMap: ['Daily Events-/events/single','Daily Stats-/stats/single'],
        GeneralPageLineChart: ['POI data-/poi','Hourly Events-/events/hourly','Daily Events-/events/daily','Hourly Stats-/stats/hourly','Daily Stats-/stats/daily'],
        GeneralPagePieCharts: ['POI data-/poi','Hourly Events-/events/hourly','Daily Events-/events/daily','Hourly Stats-/stats/hourly','Daily Stats-/stats/daily'],
    }})
    //current URL
    const [url,setUrl] = useState(0)
    //CHARTs
    const charts = useMemo(()=>['GeneralPageLineChart','GeneralPagePieCharts','GeneralPageMap'])
    const [curChart, setCurChart] = useState(0)
    //Fetch data from api in url state
    useEffect(()=>{
        async function fetchData(){
            let data = await getData(getUrl(urls[charts[curChart]][url]));
            if(data != null)
                setDataSet(data)
        }
        fetchData();
        
    },[url,curChart])

    return (
        <div className= "generalpage">
            <div className="generalpage__heading">Visualize data with metrics</div>
            <GeneralPageSidebar curUrl={url} urls={urls} setUrl={setUrl} curChart={charts[curChart]}/>
            <GeneralPageChartSelector curChart={curChart} setCurChart={setCurChart} charts={charts}/>
            <GeneralPageMainPage dataSet={dataSet} curChart={curChart} charts={charts} url={urls[charts[curChart]][url]}/>
        </div>
    )
}

export default memo(GeneralPage)
