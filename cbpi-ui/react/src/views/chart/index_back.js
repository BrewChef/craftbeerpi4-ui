import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Card, CardTable} from "reactstrap";
import {goBack} from "react-router-redux";
import {load} from "../../recucers/chart";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {Line} from "react-chartjs-2";

@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: state.chart.data,
        item: state[ownProps.match.params.type].list[ownProps.match.params.id]

    }
}, (dispatch, ownProps) => {
    return {

        load: (type, id) => {
            dispatch(load(type, id))
        },
        goBack: () => {
            dispatch(goBack())
        }
    }
}, null, {withRef: true})
export default class Chart extends Component {

    componentDidMount() {

        this.props.load(this.props.match.params.type, this.props.match.params.id)
    }

    render() {

        if (this.props.data === undefined) {
            return <i className="fa fa-spinner fa-spin"/>
        }

        const data = {
            datasets: this.props.data
        };

        const options = {
            title: {
                display: true,
                text: this.props.item.name
            },
            animation: {
                duration: 0
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'series',
                    time: {
                        displayFormats: {
                            millisecond: 'YYYY-MM-DD h:mm:ss',
                            second: 'YYYY-MM-DD h:mm:ss',
                            minute: 'YYYY-MM-DD h:mm:ss'
                        }
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10

                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        suggestedMin: 0,
                        beginAtZero: true,
                        labelString: 'Temperatur'
                    }
                }]
            }
        }

        return (

            <Card>

                <Line options={options} data={data}/>
                <div>
                    <Button onClick={() => {
                        this.props.goBack()
                    }}><i className="fa fa-arrow-circle-left"/> </Button>
                    <Button onClick={() => {
                        this.props.goBack()
                    }}><i className="fa fa-trash"/> </Button>
                    <Button onClick={() => {
                        this.props.goBack()
                    }}><i className="fa fa-file-excel"/> </Button>
                    <Button onClick={() => {
                        this.props.load(this.props.match.params.type, this.props.match.params.id)
                    }}><i className="fa fa-sync"/> </Button>
                </div>
            </Card>



        )
    }
}

/*
 <ResponsiveContainer width = '95%' height = {500} >

 <LineChart data={this.props.data} >
 <CartesianGrid  strokeDasharray="2 2"/>
 <Line type="monotone" dataKey="value" stroke="#82ca9d"  dot={false}/>

 <ReferenceLine x={1528633713000} stroke="green" label={{ value: 'MashIn', fill: 'red' }}/>
 <ReferenceLine x={1529125553000} stroke="red" label={{ value: 'Rest1', fill: 'red' }}/>
 <ReferenceLine x={1530390853000} stroke="red" label={{ value: 'MashOut', fill: 'red' }}/>

 <XAxis tickCount={10}   domain = {['auto', 'auto']} dataKey="time" tickFormatter = {(unixTime) => moment(unixTime).format('MMMM Do YYYY, h:mm:ss')} type="number" allowDuplicatedCategory={false} />
 <YAxis dataKey="value"/>
 <Tooltip/>
 </LineChart>
 </ResponsiveContainer>
 */
/*
 fill: true,
 lineTension: 0.1,
 backgroundColor: 'rgba(127,191,63,0.4)',
 borderColor: 'rgba(127,191,63,1)',
 borderDash: [],
 borderDashOffset: 0.0,
 borderJoinStyle: 'miter',
 pointBorderColor: 'rgba(127,191,63,1)',
 pointBackgroundColor: '#fff',
 pointBorderWidth: 1,
 pointHoverRadius: 5,
 pointHoverBackgroundColor: 'rgba(75,192,192,1)',
 pointHoverBorderColor: 'rgba(220,220,220,1)',
 pointHoverBorderWidth: 2,
 pointRadius: 1,
 pointHitRadius: 10,
 responsive: true,
 */
/*
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
 */

/*
new Dygraph(document.getElementById("graphdiv2"),
              [
                [1,10,100],
                [2,20,80],
                [3,50,60],
                [4,70,80]
              ],
              {
                labels: [ "x", "A", "B" ]
              });
 */