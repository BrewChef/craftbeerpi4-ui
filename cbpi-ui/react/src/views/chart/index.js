import React, {Component} from "react";
import {connect} from "react-redux";
import {CardTable} from "reactstrap";
import {goBack} from "react-router-redux";
import {load} from "../../recucers/chart";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import Dygraph from 'dygraphs';

const data = "2018-06-11 21:35:57,22\n"+
                "2018-06-11 21:52:11,22\n"+
                "2018-06-11 22:02:36,22\n"+
                "2018-06-11 22:08:22,22\n"+
                "2018-06-11 22:13:30,22\n"+
                "2018-06-11 22:35:42,22\n"+
                "2018-06-11 22:36:36,22\n"+
                "2018-06-11 22:46:19,22\n"+
                "2018-06-11 22:47:58,22\n"+
                "2018-06-11 22:49:36,22\n"+
                "2018-06-11 22:50:25,22\n"+
                "2018-06-11 22:51:34,22\n"+
                "2018-06-11 22:52:14,22\n"+
                "2018-06-11 22:53:49,22\n"+
                "2018-06-11 23:01:53,22\n"+
                "2018-06-11 23:03:22,22\n"+
                "2018-06-11 23:09:48,22\n"+
                "2018-06-12 08:13:13,22\n"+
                "2018-06-12 08:40:54,22\n"

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


        new Dygraph(this.refs.chart, [

              ], {
            labels: [ "x", "A", "B" ]
        });





    }

    componentDidUpdate(prevProps) {
        console.log("UPDATE",this.props.data)
    }

    render() {


        return <div ref="chart"></div>

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