import PcareController from './PcareController'
import IcareController from './IcareController'
import PcareKunjunganController from './PcareKunjunganController'
import SettingBridgingBpjsController from './SettingBridgingBpjsController'
import MobileJknController from './MobileJknController'
import SettingBridgingMobileJknController from './SettingBridgingMobileJknController'

const Pcare = {
    PcareController: Object.assign(PcareController, PcareController),
    IcareController: Object.assign(IcareController, IcareController),
    PcareKunjunganController: Object.assign(PcareKunjunganController, PcareKunjunganController),
    SettingBridgingBpjsController: Object.assign(SettingBridgingBpjsController, SettingBridgingBpjsController),
    MobileJknController: Object.assign(MobileJknController, MobileJknController),
    SettingBridgingMobileJknController: Object.assign(SettingBridgingMobileJknController, SettingBridgingMobileJknController),
}

export default Pcare