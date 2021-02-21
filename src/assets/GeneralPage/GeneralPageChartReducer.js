export const CHART_REDUCER_OPTIONS = {
    EDIT_XAXIS: 'xaxis',
    ADD_LINE: 'addline',
    REMOVE_LINE: 'removeline',
    CHANGE_TEMPLATE: 'changetemplate',
    ADD_PIE_NAME: 'addpiename',
    ADD_PIE_VALUE: 'addpievalue',
    CREATE_PIE_CHARTS: 'createpiecharts',
    CLEAR_PIE_CHARTS: 'clearpiecharts',
    ADD_MAP_METRIC: 'addmapmetric',
    VIEW_MAP_METRIC: 'viewmapmetric',
    ADD_MAP_DATE: 'addmapdate'
}

export  function chartReducer(state,action){
    let actionType = action.type;
    switch(actionType){
        case CHART_REDUCER_OPTIONS.EDIT_XAXIS:  
        if(state.lines.indexOf(action.payload)>-1){
            alert("This metric is already on the Y axis");
            return state;
        } else{
            let controlsSelected = true;
                if(state.lines?.length == 0)
                    controlsSelected = false
            return {
                ...state,
                xAxis: action.payload,
                controlsSelected: controlsSelected
            }
        }
    break;

        case CHART_REDUCER_OPTIONS.ADD_LINE:
            if(state.lines.indexOf(action.payload)>-1){
                alert("This metric is already on the Y axis-ADD LINE");
                return state;
            } else{
                let controlsSelected = true;
                if(state.xAxis == null)
                    controlsSelected = false                
                return {
                    ...state,
                    lines: [...state.lines,action.payload],
                    controlsSelected: controlsSelected
                };
            }
        break;

        case CHART_REDUCER_OPTIONS.REMOVE_LINE:
            if(state.lines.indexOf(action.payload)==-1){
                alert("No such metric exists on Y axis");
                return state;
            } else{
                let tempLines = state.lines;
                tempLines.splice(tempLines.indexOf(action.payload),1)
                let controlsSelected=true;
                if(state.xAxis == null || state.lines.length == 0)
                    controlsSelected = false

                return {
                    ...state,
                    lines: tempLines,
                    controlsSelected: controlsSelected
                };
            }
        break;

        case CHART_REDUCER_OPTIONS.ADD_PIE_NAME:
            return {
                ...state,
                name: action.payload
            }
        break;
        case CHART_REDUCER_OPTIONS.ADD_PIE_VALUE:
            return {
                ...state,
                value: action.payload
            }
        break;

        case CHART_REDUCER_OPTIONS.CREATE_PIE_CHARTS:
            if(state?.keyValuePairs?.some((pair)=>{
                return pair.name === state.name && pair.value === state.value;
            })){
                alert("Already created pie chart with supplied values")
                return state;
            }else{
                if(state.name===null){
                    alert('Please provide label')
                    return state;
                } else if(state.value===null){
                    alert('Please provide Data property')
                    return state;
                } else if(state.keyValuePairs?.length == 4){
                    alert("You will have to clear the current charts to create a new one")
                    return state;
                }else{

                    return {
                        ...state,
                        name: null,
                        value: null,
                        keyValuePairs: state.keyValuePairs?.concat([{name:state.name, value:state.value}]),
                        controlsSelected: true
                    }
                }
            }
        break;

        case CHART_REDUCER_OPTIONS.CLEAR_PIE_CHARTS:
            return {
                ...state,
                keyValuePairs: []
            }
        break;

        case CHART_REDUCER_OPTIONS.CHANGE_TEMPLATE:
            return action.payload;
            break;

        case CHART_REDUCER_OPTIONS.ADD_MAP_METRIC:
            if(state.curMetric == action.payload)
                return state;
            else if(action.payload != null){
                return {
                    ...state,
                    curMetric: action.payload
                }
            }
        break;

        case CHART_REDUCER_OPTIONS.ADD_MAP_DATE:
            console.log(action.payload)
            if(state.perMetric == action.payload)
                return state;
            else if(action.payload != null){
                return {
                    ...state,
                    perMetric: action.payload
                }
            }
        break;

        case CHART_REDUCER_OPTIONS.VIEW_MAP_METRIC:
            if(state.curMetric == null){
                alert("Please select metric to view")
                return state;
            }
            else{
                return {
                    ...state,
                    controlsSelected: true
                }
            }
        break;


    }
}