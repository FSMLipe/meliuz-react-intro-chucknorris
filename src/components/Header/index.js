import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
    Menu,
    Grid,
    GridItem,
    Container,
    Center
} from '@chakra-ui/react';
import Logo from '../../assets/logo.jpg';

import api from "../../services/api";

const Header = () => {
    const [main, setMain] = useState([])
    useEffect(() => {
        api.get('categories').then(
            response => {
                setMain(response.data)
            }
        )
    }, [])

    return(
        <nav>
            <Container maxW="container.xl">
                <Grid templateColumns="repeat(7, 1fr)" gap={10}>
                    <GridItem colStart={2} colSpan={2}>
                        <Link to='/home'>
                            <img src={Logo} className="logo" alt="Logo" />
                        </Link>
                    </GridItem>
                    <GridItem colSpan={2} colEnd={8}>
                        <Menu>
                            {main?.map( item => (
                                <>
                                    <Center>
                                        <Link to='/any'>
                                            <h5>{item}</h5>
                                        </Link>
                                    </Center>
                                </>
                            ))}   
                        </Menu>
                    </GridItem>
                </Grid>
            </Container>
        </nav>
    )
}

export default Header;