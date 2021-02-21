import {env} from '../app_config'
import axios from "axios"

export default async function getData(url){
    try{
    let res =  await axios.get(env.API_URI+url,{
        headers:{
            "Access-Control-Allow-Origin":"*"
        }
    })
    return res?.data;
    }catch(e){
        alert(e.message);
        return null;
    }
}