import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {
    Center,
    Grid,
    GridItem,
    Container,
    FormControl,
    FormLabel,
    Select
} from '@chakra-ui/react';
import Logo from '../../assets/logo.jpg';

import api from "../../services/api";

const Header = () => {
    const [main, setMain] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        api.get('categories').then(
            response => {
                setMain(response.data)
            }
        )
    }, [])

    const handleCategory = (e) => {
        navigate(`/categories/${e.target.value}`)
    }

    return(
        <nav>
            <Container maxW="container.xl">
                <Grid templateColumns="repeat(7, 1fr)" gap={10} padding="45px" >
                    <GridItem colStart={1} colSpan={2}>
                        <Link to='/home'>
                            <img src={Logo} className="logo" alt="Logo" />
                        </Link>
                    </GridItem>
                    <GridItem colSpan={2} colEnd={8}>
                        <Center h="150px">
                        <FormControl>
                            <FormLabel>Seleciona a categoria abestado:</FormLabel>
                            <Select onChange={handleCategory}>
                                {main?.map( (item, index) => (
                                    <option key={index} value={item}> {item} </option>
                                ))}
                            </Select> 
                        </FormControl>
                        </Center>
                    </GridItem>
                </Grid>
            </Container>
        </nav>
    )
}

export default Header;