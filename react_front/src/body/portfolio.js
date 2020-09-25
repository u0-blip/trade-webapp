import React, { useState } from 'react'

import '../../node_modules/react-vis/dist/style.css';
import { RadialChart } from 'react-vis';
import clsx from 'clsx';
import Movement from '../util/plot/movement';

// $(function () {
//     $.ajax({
//         type: 'POST',
//         url: '/plot/AAPL',
//         success: function (scripts) {
//             var scripts_list = JSON.parse(scripts)
//             $('#price').html(scripts_list[0])
//             $('#volume').html(scripts_list[1])
//         },
//         error: function () {
//             alert('Unexpected error');
//         }
//     });
// });

// $(function () {
//     $.ajax({
//         type: 'POST',
//         url: '/plot/^GSPC VAS.AX ^HSI',
//         success: function (scripts) {
//             var scripts_list = JSON.parse(scripts)
//             $('#sparkline-1').html(scripts_list[0])
//             $('#sparkline-2').html(scripts_list[1])
//             $('#sparkline-3').html(scripts_list[2])
//         },
//         error: function () {
//             alert('Unexpected error');
//         }
//     });
// });

function Port() {

    const myData = [{ angle: 1 }, { angle: 5 }, { angle: 2 }]

    return (
        <RadialChart
            data={myData}
            width={300}
            height={300} />
    )
}
export default function Portfolio() {
    const [display, setDisplay] = useState('Movement')
    return (
        <div class="nav-tabs-custom">

            <ul class="nav nav-tabs">
                <li class={clsx("nav-item", display === 'Movement' && 'active')}><a class="nav-link " href="#revenue-chart" onClick={() => setDisplay('Movement')} data-toggle="tab">Movement</a></li>
                <li class={clsx("nav-item", display === 'Port' && 'active')}><a class="nav-link" href="#sales-chart" onClick={() => setDisplay('Port')} data-toggle="tab">Portfolio</a></li>
            </ul>

            {/* <!-- <h1>This is our prediction for tomorrow  for the given stock</h1> --> */}

            <div class="tab-content no-padding">
                {display === 'Movement' ? <div class="chart tab-pane active" style={{ position: 'relative', height: '300px', }}>
                    <div id='price' style={{ position: 'relative', height: '200px', }}>
                        <Movement size={{
                            width: '300',
                            height: '300'
                        }} />
                    </div>
                    <div id='volume' style={{ position: 'relative', height: '100px', }}></div>
                </div>
                    :
                    <div class="chart tab-pane active" style={{ position: 'relative', height: '300px', }}>
                        <Port />
                    </div>}
            </div>
        </div>
    )
}
