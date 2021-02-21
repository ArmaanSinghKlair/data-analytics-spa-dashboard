import './App.css';
import {useMemo} from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from './assets/HomePage';
import GeneralPage from './assets/GeneralPage/GeneralPage'
import DataTable from './assets/DataTable/DataTable'
function App() {
  const routes = useMemo(()=>{
    return [{
        path:"/general",
        render:()=>(
            <GeneralPage />
        )
    },
    {
      path:"/datatable",
      render:()=>(
          <DataTable />
      )
  },
{
  path: "*",
  render:()=>(
    <HomePage />
  )
}]
},[])

  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map((route,i)=>(
            <Route {...route} key={i}/>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
