import React,{useState,useEffect} from 'react'

function DataTablePageHeader({handleSearch, metrics}) {
    const [curMetric, setCurMetric] = useState([]);

    useEffect(()=>{
        if(metrics != null)
            setCurMetric(metrics[0])
    },[metrics])
    return (
        <div className="datatable__pageheader flex flex-row">
            <div className="datatable__pageheader__searchbar flex flex-row">
                <label for="search"><i className="material-icons">search</i></label>
                <input type="text" onKeyUp={(e)=>handleSearch(e,curMetric)} onFocus={(e)=>handleSearch(e,curMetric)} id="search" placeholder="Search by metric" autoComplete="off"/>
            </div>
            <select onChange={e=>setCurMetric(e.target.value)}>
                    {
                        metrics?.map((metric,i)=>(
                            <option value={metric} key={i}>{metric.toUpperCase()} </option>
                        ))
                    }
                </select>
        </div>
    )
}

export default DataTablePageHeader
