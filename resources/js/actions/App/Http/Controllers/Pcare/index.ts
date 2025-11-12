import PcareController from './PcareController'
import PcareKunjunganController from './PcareKunjunganController'
import MobileJknController from './MobileJknController'
import SettingBridgingBpjsController from './SettingBridgingBpjsController'
import SettingBridgingMobileJknController from './SettingBridgingMobileJknController'

const Pcare = {
    PcareController: Object.assign(PcareController, PcareController),
    PcareKunjunganController: Object.assign(PcareKunjunganController, PcareKunjunganController),
    MobileJknController: Object.assign(MobileJknController, MobileJknController),
    SettingBridgingBpjsController: Object.assign(SettingBridgingBpjsController, SettingBridgingBpjsController),
    SettingBridgingMobileJknController: Object.assign(SettingBridgingMobileJknController, SettingBridgingMobileJknController),
}

export default Pcare