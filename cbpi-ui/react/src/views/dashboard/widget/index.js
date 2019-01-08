export { default as ActorWidget } from "./ActorWidget";
export { default as BrewNameWidget } from "./BrewNameWidget";
export { default as KettleWidget } from "./KettleWidget";
export { default as SensorWidget } from "./SensorWidget";
export { default as StepControls } from "./StepControls";
export { default as StepList } from "./StepList";
export { default as TankWidget } from "./TankWidget";
export { default as TextWidget } from "./TextWidget";
export { default as KettleAddModal } from "./KettleAddModal";
export { default as ActorAddModal } from "./ActorAddModal";
export { default as SensorAddModal } from "./SensorAddModal";
export { default as TankAddModal } from "./TankAddModal";

import KettleWidget from "./KettleWidget";
import KettleAddModal from "./KettleAddModal";
import ActorWidget from "./ActorWidget";
import ActorAddModal from "./ActorAddModal";
import SensorWidget from "./SensorWidget";
import SensorAddModal from "./SensorAddModal";
import TextWidget from "./TextWidget";
import StepList from "./StepList";
import StepControls from "./StepControls";
import BrewNameWidget from "./BrewNameWidget";
import TankWidget from "./TankWidget";
import TankAddModal from "./TankAddModal";
import TextAddModal from './TextAddModal'
import VisualKettle from "./VisualKettle";
import VisualKetteAddModal from "./VisualKetteAddModal";
import VolumeCalc from './VolumeCalc'
import MixCalc from './MixCalc'
import BBQKettle from './BBQKettle'
import BBQKetteAddModal from './BBQKetteAddModal'
import SSKettle from './SSKettle'

export const config = {
            kettle: {
                name: "Kettle",
                component: KettleWidget,
                dialog: KettleAddModal
            },
            vkettle: {
                name: "VKettel",
                component: VisualKettle,
                dialog: VisualKetteAddModal
            },
            actor: {
                name: "Actor",
                component: ActorWidget,
                dialog: ActorAddModal
            },
            sensor: {
                name: "Sensor",
                component: SensorWidget,
                dialog: SensorAddModal
            },
            tank: {
                name: "Tank",
                component: TankWidget,
                dialog: TankAddModal
            },
            text: {
                name: "Text",
                component: TextWidget,
                dialog: TextAddModal
            },
            step_list: {
                name: "Step List",
                component: StepList
            },
            step_control: {
                name: "Step Controls",
                component: StepControls
            },
            brew_name: {
                name: "Brew Name",
                component: BrewNameWidget
            },
            volume: {
                name: "Volumen Calc",
                component: VolumeCalc

            }
            ,
            mix: {
                name: "Mix Calc",
                component: MixCalc

            },
            bbq: {
                name: "BBQ Kettle",
                component: BBQKettle,
                dialog: BBQKetteAddModal
            },

            sskettle: {
                name:"SS Kettle",
                component: SSKettle
            }
        }