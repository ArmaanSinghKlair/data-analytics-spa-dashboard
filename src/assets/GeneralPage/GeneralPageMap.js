import React,{useRef,useEffect} from 'react'
import mapConfig from '../mapConfig'
import getData from '../getData'

import '../stylesheets/GeneralPageMap.css'

function clearMarkers(markers) {
    console.log(markers)
    for (let m of markers) {
        if(m?.setMap)
            m.setMap(null)
    }
  }

function GeneralPageMap({curMetric, perMetric, dataSet,url}) {
    const markersRef = useRef([null])

    useEffect(()=>{
        if(document.getElementById("map")!= null){
        async function loadMap(){
            let data=null;
                if(url?.indexOf("stats") != -1)
                    data = await getData(`/stats/perday/${perMetric!=null?perMetric:"first"}`);
                else
                    data = await getData(`/events/perday/${perMetric!=null?perMetric:"first"}`);
                //clear any existing markers
                clearMarkers(markersRef.current)
                console.log()
                markersRef.current =  mapConfig(data, curMetric)
            }
        loadMap();

        }
       
    },[curMetric,dataSet])
    //},[curMetric])

    if(dataSet !== null && dataSet?.length > 0 && curMetric != null){
        return (
            <div className="generalpage__map">
                <div className="generalpage__info"><span>High</span><span>Low</span></div>
                <div id="map"></div>
            </div>
        )
    } else{
        return (
            <span className="material-icons loader">
                hourglass_empty
            </span>
        )
    }
}

export default GeneralPageMap
