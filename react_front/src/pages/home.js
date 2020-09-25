import React from 'react'

import StatsBars from '../stats/statsBar';
import Portfolio from '../body/portfolio';
import MapBox from '../body/mapBox';
export default function Home() {
    return (
        <>
            <StatsBars />
            <Portfolio />
            <MapBox />
        </>
    )
}
