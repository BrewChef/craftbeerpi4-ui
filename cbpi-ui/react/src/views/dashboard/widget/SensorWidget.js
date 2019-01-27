import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, ButtonGroup} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {bindActionCreators} from "redux";
import {Sparklines, SparklinesLine} from "react-sparklines";
import OptionModal from "../../../common/OptionModal";
import {call_action} from "../../../recucers/sensor";

const reducer_name = "sensor"

@connect((state, ownProps) => {
    return {

        data: ownProps.id ? state[reducer_name].list[ownProps.id] : {},
        config: state[reducer_name].form_config,
        types: state[reducer_name].types,

    }
}, (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack, call_action}, dispatch)

    }
}, null, {withRef: true})
export default class SensorWidget extends Component {

    render = () => {
        let {goBack, save, add, remove, call_action, push} = this.props.actions
        let {data, x, y, dummy, types, id} = this.props
        if (!data) {
            return <div className="not_found_bg" style={{position: 'absolute', top: y, left: x, width: 225, height: 66}}>NOT FOUND</div>
        }

        if (dummy) {
            return <div className="card-bg" style={{width: 225, height: 66}}>{data.name}</div>
        }



        let options = []

        if (data.type && types[data.type]) {

            let type_cfg = types[data.type]

            options = _.map(type_cfg.actions, (value, idx) => ({
                label: value.label, action: () => {
                    call_action(id, value.method)
                }
            }))
        }

        options.push({label: "Chart1", action: () => { push("/app/chart/sensor/"+id) } })

        return <div style={{position: 'absolute', top: y, left: x}}>
            <ButtonGroup >
                <Button color="default" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 175}}>

                        <Sparklines style={{position: 'absolute', top: 0, left: 0, width: 175, height: 66}} data={data.cache}>
                            <SparklinesLine color="#8f8f8f"/>
                        </Sparklines>

                    <div style={{marginLeft: 10}}>
                        <div>
                            {data.value}°C
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"}}>

                            <div style={{fontSize: '12px'}}> {data.name}</div>

                        </div>
                    </div>
                </Button>
                <Button onClick={()=>{this.refs.settings.wrappedInstance.toggle()}} color="primary" style={{width: 50}}>
                    <i className="fa fa-cog"/>
                </Button>

            </ButtonGroup>
            <OptionModal ref="settings" title={data.name} cancel options={options}/>
        </div>
    }

}

