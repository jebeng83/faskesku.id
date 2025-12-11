import DepartemenController from './DepartemenController'
import BidangController from './BidangController'
import PendidikanController from './PendidikanController'
import ResikoKerjaController from './ResikoKerjaController'
import KelompokJabatanController from './KelompokJabatanController'
import EmergencyIndexController from './EmergencyIndexController'
import BankController from './BankController'
import SttsWpController from './SttsWpController'
import SttsKerjaController from './SttsKerjaController'
import JenjangJabatanController from './JenjangJabatanController'
import SipPegawaiController from './SipPegawaiController'

const Kepegawaian = {
    DepartemenController: Object.assign(DepartemenController, DepartemenController),
    BidangController: Object.assign(BidangController, BidangController),
    PendidikanController: Object.assign(PendidikanController, PendidikanController),
    ResikoKerjaController: Object.assign(ResikoKerjaController, ResikoKerjaController),
    KelompokJabatanController: Object.assign(KelompokJabatanController, KelompokJabatanController),
    EmergencyIndexController: Object.assign(EmergencyIndexController, EmergencyIndexController),
    BankController: Object.assign(BankController, BankController),
    SttsWpController: Object.assign(SttsWpController, SttsWpController),
    SttsKerjaController: Object.assign(SttsKerjaController, SttsKerjaController),
    JenjangJabatanController: Object.assign(JenjangJabatanController, JenjangJabatanController),
    SipPegawaiController: Object.assign(SipPegawaiController, SipPegawaiController),
}

export default Kepegawaian