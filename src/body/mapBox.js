import React, { Component } from 'react'
import { VectorMap } from 'react-jvectormap';
import Movement from '../util/plot/movement';


export default class MapBox extends Component {
    render() {
        let map_args = {
            map: 'world_mill',
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: '#e4e4e4',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                }
            },
            series: {
                regions: [{
                    // values: visitorsData,
                    scale: ["#92c1dc", "#ebf4f9"],
                    normalizeFunction: 'polynomial'
                }]
            },
            containerStyle: {
                width: '100%',
                height: '100%'
            },
            markers: [
                { latLng: [40.713, -74.01], name: 'New York' },
                { latLng: [51.5074, 0.1278], name: 'London' },
                { latLng: [31.2304, 121.4737], name: 'Shanghai' },
                { latLng: [22.3193, 114.1694], name: 'HK' },
                { latLng: [-33.8688, 151.2093], name: 'Sydney' },
                { latLng: [35.6762, 139.6503], name: 'Tokyo' },
            ],

        }
        return (
            <div class="box box-solid bg-light-blue-gradient">

                <div class="box-header">
                    <div class="pull-right box-tools">
                        <button type="button" class="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" title="Date range">
                            <i class="fa fa-calendar"></i></button>
                        <button type="button" class="btn btn-primary btn-sm pull-right" data-widget="collapse" data-toggle="tooltip" title="Collapse" mr-5>
                            <i class="fa fa-minus"></i></button>
                    </div>

                    <i class="fa fa-map-marker"></i>

                    <h3 class="box-title">
                        Global Market
                </h3>
                </div>
                <div style={{ width: 'auto', height: '300px' }}>
                    <VectorMap
                        {...map_args}
                    />
                </div>
                <div class="box-footer no-border">
                    <div class="row">
                        <div class="col-4 text-center" style={{ borderRight: '1px solid #f4f4f4' }}>
                            <div id="sparkline-1"></div>
                            <div class="knob-label">S&P500</div>
                            <Movement size={{
                                width: '300',
                                height: '150'
                            }} />
                        </div>
                        <div class="col-4 text-center" style={{ borderRight: '1px solid #f4f4f4' }}>
                            <div id="sparkline-2"></div>
                            <div class="knob-label">ASX</div>
                            <Movement size={{
                                width: '300',
                                height: '150'
                            }} />
                        </div>
                        <div class="col-4 text-center">
                            <div id="sparkline-3"></div>
                            <div class="knob-label">HSI</div>
                            <Movement size={{
                                width: '300',
                                height: '150'
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
