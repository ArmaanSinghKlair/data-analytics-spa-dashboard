import React,{useState,useMemo} from 'react'
import '../stylesheets/DataTableMainPage.css'
import DataTablePageHeader from './DataTablePageHeader'
import DataTableTable from './DataTableTable'
import Fuse from 'fuse.js';

function DataTableMainPage({dataSet}) {
    const metrics =   useMemo(()=>{
       if(dataSet != null && dataSet.length > 0)
        return Object.keys(dataSet[0])
       else
        return null 
    }, [dataSet]);

    const [filteredDataSet,setFilteredDataSet] = useState(dataSet);

    // function for handling search
    function handleSearch(e,curMetric){
        const options = {
            keys: [
                curMetric
            ]
        }
        //if user hasn't entered anything
        if(e.target.value == null || e.target.value.trim().length == 0){
            setFilteredDataSet(dataSet)
        }else{
            const fuse = new Fuse(dataSet,options);
            setFilteredDataSet(fuse.search(e.target.value).map(result=>result.item))
        }
    }
   
    return (
        <div className="datatable__mainpage flex flex-column">
            <DataTablePageHeader metrics={metrics} handleSearch={handleSearch}/>
            <DataTableTable dataSet={filteredDataSet} metrics={metrics}/>
        </div>
    )
}

export default DataTableMainPage
