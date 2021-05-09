import React from 'react'

import StatsBars from '../stats/statsBar';
import Portfolio from '../body/portfolio';
import MapBox from '../body/mapBox';
import { Container } from '@material-ui/core';
export default function Home() {
    return (
        <>
            <Container>
                <StatsBars />
                <Portfolio />
                <MapBox />
            </Container>
        </>
    )
}
