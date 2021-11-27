import React, {useEffect, useState} from 'react';
import {
  AiOutlineSearch
} from 'react-icons/ai';

import {
  FormLabel,
  Input,
  Button,
  Stack
} from '@chakra-ui/react'

import api from '../../services/api';
import Loader from '../../assets/load.gif'

const App = () => {
  //Create a 'isLoading' state for the submit search button, creating a const as bellow and the state inside the button
  const [data, setData] = useState({});
  const [allJokes, setAllJokes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [ searchJoke, setSearchJoke ] = useState('');
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
    }, 2500))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoad(true)
    api.get(`search?query=${searchJoke}`).then(
      res => {
        setIsSearch(true)
        setAllJokes(res.data)
      }
    )
    .catch( err => console.error(err))
    .finally( () => setIsLoad(false))
  }

  if(isLoad){
    return(
      <div className="loader">
        <img src={Loader} alt="Loading" />
      </div>
    )
  }

  return(
    <div className="home-component">
      <div>
        <form onSubmit={handleSubmit}>
          <FormLabel>Pesquise um termo do tipo de piada que tu quer abestado:</FormLabel>
          <Stack direction="row" align="center">
            <Input type="text" onChange={e => setSearchJoke(e.target.value)} />
            <Button type="submit" size="md" colorScheme="light-gray" variant="outline" rightIcon={<AiOutlineSearch />}>Pesquisar</Button>
          </Stack>
        </form>
      </div>
      <h1>E ai seu abestado!</h1>
      <h2>Olha essa piada:</h2>

      { !isSearch ? (
        <div className="jokes">
          <img src={data?.icon_url} alt={data?.value} />
          <h3>{data?.value}</h3>
        </div>
      ) : (
        <>
          { allJokes?.result.map( (item, index) => (
            <div key={index} className="jokes">
              <img src={item?.icon_url} alt={item?.value} />
              <h3>{item?.value}</h3>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default App