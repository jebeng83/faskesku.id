import PcareController from './PcareController'
import SettingBridgingBpjsController from './SettingBridgingBpjsController'

const Pcare = {
    PcareController: Object.assign(PcareController, PcareController),
    SettingBridgingBpjsController: Object.assign(SettingBridgingBpjsController, SettingBridgingBpjsController),
}

export default Pcare