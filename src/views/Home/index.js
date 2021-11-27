import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import Loader from '../../assets/load.gif'

const App = () => {
  const [data, setData] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    setIsLoad(true)
    api.get('random').then(
      response => {
        setData(response.data)
      }
    )
    .catch( e => console.error(e))
    .finally( () => setTimeout(() => {
      setIsLoad(false)
    }, 5000))
  }, [])

  if(isLoad){
    return(
      <div className="loader">
        <img src={Loader} alt="Loading" />
      </div>
    )
  }

  return(
    <div className="home-component">
      <h1>E ai seu abestado!</h1>
      <h2>Olha essa piada:</h2>
      <div className="jokes">
        <img src={data?.icon_url} alt={data?.value} />
        <h3>{data?.value}</h3>
      </div>
    </div>
  )
}

export default App