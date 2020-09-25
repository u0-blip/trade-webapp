import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import IonPie from 'react-ionicons/lib/MdPie';
import IonStat from 'react-ionicons/lib/MdStats';
import IonFlame from 'react-ionicons/lib/MdFlame';
export class StatsBar extends Component {
    render() {
        let stats = this.props.stats;
        let statsIcon;
        switch (stats) {
            case 'Fund utility':
                statsIcon = <div class="icon">
                    <IonPie />
                </div>
                break;
            case 'Return (day)':
                statsIcon = <div class="icon">
                    <IonFlame />
                </div>
                break;
            case 'Alpha':
            case 'Beta':
            case 'Sharpe':
                statsIcon = <div class="icon">
                    <IonStat />
                </div>
                break;
        }
        return (
            <div class="col-lg-2 col-xs-4">
                <div class="small-box bg-red-gradient">
                    <div class="inner">
                        <h3>2.62</h3>

                        {stats}
                    </div>
                    {statsIcon}
                    <a href="#" class="small-box-footer">More info
                    <FontAwesomeIcon icon={faArrowAltCircleRight} /></a>
                </div>
            </div>
        )
    }
}

export class StatsBars extends Component {
    render() {
        let statsArr = ['Sharpe', 'Return (day)', 'Alpha', 'Beta', 'Sharpe', 'Fund utility'];
        return <div className='container'>
            <div className='row'>
                {statsArr.map(stats => {
                    return <StatsBar stats={stats} />
                })}
            </div>
        </div>
    }
}

export default StatsBars
