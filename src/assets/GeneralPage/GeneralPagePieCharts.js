import React,{useMemo} from 'react'
import { PieChart, Pie, Tooltip} from "recharts";

function GeneralPagePieCharts({keyValuePairs,dataSet}) {
    let finalDataset = useMemo(()=>keyValuePairs?.map((pair,i)=>{
        return {
            value: pair.value,
            dataSet: dataSet.map(data=>{
            return {
                name: data[pair.name],
                [pair.value]: data[pair.value]
            }
        })
    }
     }),[keyValuePairs?.length]);

     const colors=['blue','darkgreen','tomato','gold']
    return (
        <div className="chart chart__piechart">
            <PieChart width={window.innerWidth*.5} height={500}>
                 {
                     finalDataset?.map((info,i)=>{
                        return (<Pie
                            key={i}
                            dataKey={info.value}
                            isAnimationActive={false}
                            data={info.dataSet}
                            cx={((3*i+2)*100)%600}
                            cy={100+Math.floor((i/2))*250}
                            outerRadius={80}
                            innerRadius={40}
                            fill={colors[i]}
                            label
                        />  )                   })
                 }  
                 <Tooltip/>
                 </PieChart>     
        </div>
    )
}

export default React.memo(GeneralPagePieCharts,[(prev,next)=>prev.keyValuePairs?.length === next.keyValuePairs?.length])
 