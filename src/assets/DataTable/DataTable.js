import React,{memo,useEffect, useState,useMemo,useCallback} from 'react'
import axios from "axios"
import {env} from '../../app_config'
import DataTableSidebar from './DataTableSidebar'
import DataTableMainPage from './DataTableMainPage'
import '../stylesheets/DataTable.css'

function DataTable() {
    const [dataSet,setDataSet] = useState(null)
    const getUrl = useCallback((text)=>{
        return text.substring(text.indexOf("-")+1)
    },[])
    const urls = useMemo(()=>['POI data-/poi','Hourly Events-/events/hourly','Daily Events-/events/daily','Hourly Stats-/stats/hourly','Daily Stats-/stats/daily'])
    const [url,setUrl] = useState(0)
    
    useEffect(()=>{
        console.log(env.API_URI+getUrl(urls[url]))
        axios.get(env.API_URI+getUrl(urls[url]),{
            headers:{
                "Access-Control-Allow-Origin":"*"
            }
        }).then((res)=>{
            setDataSet(res.data);
        }).catch((err)=>{
            alert(err);
        })
    },[url])
    return (
        <div className="datatable">
            <div className="datatable__heading">Data Table Search</div>
            <DataTableSidebar curUrl={url} urls={urls} setUrl={setUrl}/>
            <DataTableMainPage dataSet={dataSet} />
        </div>
    )
}

export default memo(DataTable)
