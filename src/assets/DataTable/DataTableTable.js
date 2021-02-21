import React, {memo} from 'react'

function DataTableTable({dataSet,metrics}) {
    console.log(dataSet)
    if(metrics == null){    //API has not fetched data yet
        return (
        <span className="material-icons loader">
            hourglass_empty
        </span>
        
        )
    }else if(dataSet == null || dataSet.length==0){   // No search results found
        return (
            <div className="centered flex flex-row no-search-results">
                <span className="material-icons">
                    search_off
                </span> 
                <span>No results for search term</span>
            </div>
            
            )
    } else{
        return (
            <div className="datatable__table">
                <table>
                    <thead>
                        <tr>
                                {metrics?.map((metric,id)=>(
                                    <th key={id}>{metric}</th>
                                ))}
                        </tr>
                    </thead>

                <tbody>
                        {dataSet?.map((data,id)=>(
                            <tr>
                                {metrics?.map((metric,idd)=>(
                                    <td key={idd+idd+id}>{data[metric]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default memo(DataTableTable)
