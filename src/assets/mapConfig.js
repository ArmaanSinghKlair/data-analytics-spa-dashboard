
const google = window.google
//const MarkerClusterer = window.MarkerClusterer 

function getRelativeValue(max,min,cur,total){
    return Math.floor(((max-cur)/(max-min))*total)
}

//Tested
function getMaxMin(dataSet,curMetric){
    let min = null,max=0
    let data;
    for(data in dataSet){
        if(min==null){
            min = dataSet[data][curMetric];
            continue;
        }
        if(dataSet[data][curMetric]<min){
            min = dataSet[data][curMetric]
        }
        if(dataSet[data][curMetric]>max){
            max = dataSet[data][curMetric]
        }
    }
    return [max,min]
}
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export default function mapConfig(dataSet, curMetric){
        if(document.getElementById("map")==null)
            return;
        //Getting max and minimum metric to figure out each value's intensity
        let [max,min] = getMaxMin(dataSet,curMetric)        
        //console.log(dataSet)
        const center = new google.maps.LatLng(dataSet[0]?.lat, dataSet[0]?.lon);
        const map = new google.maps.Map(document.getElementById("map"),{
            center: center,
            zoom:1,
            mapId: "ae53a2d5beaebd92"
        })
        //Declaring info window
        const infoWindow = new google.maps.InfoWindow();

        //We make a simple diamond marker icon
        const svgMarker = {
            path: null,
            fillColor: null,
            fillOpacity: 1,
            strokeWeight: 0,
            rotation: 0,
            scale: 1,
            anchor: new google.maps.Point(0,0),
          };

        //Loading Markers into an Array
        var markers =[
            dataSet.map((poi_data,i)=>{
                //Color depends upon the value of the current metric
                svgMarker.fillColor = `rgb(255,${getRelativeValue(max,min,poi_data[curMetric],254)},0)`
               // console.log(svgMarker.fillColor)

                //Marker Size here
                let markerSize = (30-getRelativeValue(max,min,poi_data[curMetric],30))+15;
                let path = `M 0,${markerSize/2} A ${markerSize/2},${markerSize/2} 0 0,1 ${markerSize},${markerSize/2}  A ${markerSize/2},${markerSize/2} -180 0,1 0,${markerSize/2}`
                svgMarker.path = path

                let opacity = (0.5-getRelativeValue(max,min,poi_data[curMetric],0.5))+0.5;
                svgMarker.fillOpacity = opacity;
                //Marker created here
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(poi_data.lat,poi_data.lon),
                    icon: svgMarker,
                    map: map,
                    label:{
                        text:poi_data["name"],
                        color: "white"
                    }
                })
                
                             //Here adding the onClick listener
                marker.addListener("click",(e)=>{
                    infoWindow.setContent(`<b>${poi_data.poi_id}. ${poi_data.name}</b><br/>${curMetric}: ${poi_data[curMetric]}`)
                    infoWindow.open(map,marker)
                })
                return marker
            })
        ]
        //Add clustering with default icons from google maps library
        /*new MarkerClusterer(map,markers,{
            imagePath:
              '../../public/images/m.png',
          })
          */

          return markers;
    }