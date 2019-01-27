import React, {Component} from "react";
import {CardTable} from "reactstrap";
import moment from "moment";
import {Line} from "react-chartjs-2";

const newDateString = (days, type='s') => {
    return moment().add(days, type).format();
}

const data1 = (plus = 1, type='s') => {
    let result = []
    for (let i = 0; i < 200; i++) {
        result.push({x: newDateString(i + plus), y: Math.floor(Math.random() * 11)})
        console.log({x: i + plus, y: 10})
    }
    return result;
}

console.log(data1(5,'m'))

const data = {

    datasets: [

        {
            label: 'Target Temp',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            responsive: true,
            data: data1(5,'m')
        },
        {
            label: 'Target Temp',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            responsive: true,
            data: data1(5)
        }

    ]
};

const options = {
    animation: {
        duration: 0
    },
    scales: {
        xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
                displayFormats: {
                    minute: 'h:mm a'
                }
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Datum'
            },
            ticks: {
                major: {
                    fontStyle: 'bold',
                    fontColor: '#FF0000'
                }
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }
        }]
    }
}

export default class Chart extends Component {

    componentDidMount() {

    }

    render() {

        return (

            <div>
                <Line options={options} data={data}/>
            </div>


        )
    }
}