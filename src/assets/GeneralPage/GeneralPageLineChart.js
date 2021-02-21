import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

function GeneralPageLineChart({xAxis, lines, dataSet}) {
  
    return (
        <div className="chart chart__linechart">
         <LineChart
      width={window.innerWidth*0.5}
      height={500}
      data={dataSet}
      
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey={xAxis} />
      <YAxis/>
      <Tooltip />
      <Legend />
      {
          lines?.map((line,i)=>{
              return (
                <Line
                type="monotone"
                dataKey={line}
                stroke={`rgb(${Math.floor(Math.random()*250+1)},${Math.floor(Math.random()*100+1)},${Math.floor(Math.random()*250+121)})`}
                activeDot={{ r: i }}
                key={i}
              />
              )
          })
      }
      
    </LineChart>   
        </div>
    )
}

export default React.memo(GeneralPageLineChart)
