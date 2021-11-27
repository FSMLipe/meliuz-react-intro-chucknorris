import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Loader from '../../assets/load.gif';
import api from '../../services/api';

const Categories = () => {
    const { category } = useParams();
    const [ joke, setJoke ] = useState({});
    const [ isLoad, setIsLoad ] = useState(false)

    useEffect(() => {
        setIsLoad(true)
        api.get(`random?category=${category}`).then(
            res => {
                setJoke(res.data)
            }
        )
        .catch( err => console.error(err) )
        .finally( () => setIsLoad(false) )
    }, [category])

    if(isLoad){
        return(
            <div>
                <img src={Loader} alt="Loading" />
            </div>
        )
    }

    return (
        <>
            <div>
                <h1>Categorias</h1>
                <img src={joke?.icon_url} alt={joke?.value} />
                <h4>{joke?.value}</h4>
            </div>
        </>
    )
}

export default Categories