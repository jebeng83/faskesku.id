import Webhook from './Webhook'
import API from './API'
import RawatJalan from './RawatJalan'
import Pcare from './Pcare'
import QueueController from './QueueController'
import Antrian from './Antrian'
import PermintaanLabController from './PermintaanLabController'
import MenuController from './MenuController'
import SDKI from './SDKI'
import Odontogram from './Odontogram'
import WhatsApp from './WhatsApp'
import Alergi from './Alergi'
import PermintaanRadiologiController from './PermintaanRadiologiController'
import OpnameController from './OpnameController'
import Farmasi from './Farmasi'
import BarangController from './BarangController'
import DataBarangController from './DataBarangController'
import GudangBarangController from './GudangBarangController'
import Kepegawaian from './Kepegawaian'
import SatuSehat from './SatuSehat'
import JadwalController from './JadwalController'
import PoliklinikController from './PoliklinikController'
import BangsalController from './BangsalController'
import KamarController from './KamarController'
import Akutansi from './Akutansi'
import AuthController from './AuthController'
import SuratController from './SuratController'
import PatientController from './PatientController'
import Pasien from './Pasien'
import RegistrationController from './RegistrationController'
import SkriningVisualController from './SkriningVisualController'
import EmployeeController from './EmployeeController'
import DoctorController from './DoctorController'
import SpesialisController from './SpesialisController'
import RegPeriksaController from './RegPeriksaController'
import PembayaranController from './PembayaranController'
import ProfileController from './ProfileController'
import setting from './setting'
import RawatInapController from './RawatInapController'
import IGDController from './IGDController'
import KamarOperasiController from './KamarOperasiController'
import LaboratoriumController from './LaboratoriumController'
import RadiologiController from './RadiologiController'
import RehabilitasiMedikController from './RehabilitasiMedikController'
import KategoriPerawatanController from './KategoriPerawatanController'
import DaftarTarifController from './DaftarTarifController'
import TarifTindakanController from './TarifTindakanController'
import PenjabController from './PenjabController'

const Controllers = {
    Webhook: Object.assign(Webhook, Webhook),
    API: Object.assign(API, API),
    RawatJalan: Object.assign(RawatJalan, RawatJalan),
    Pcare: Object.assign(Pcare, Pcare),
    QueueController: Object.assign(QueueController, QueueController),
    Antrian: Object.assign(Antrian, Antrian),
    PermintaanLabController: Object.assign(PermintaanLabController, PermintaanLabController),
    MenuController: Object.assign(MenuController, MenuController),
    SDKI: Object.assign(SDKI, SDKI),
    Odontogram: Object.assign(Odontogram, Odontogram),
    WhatsApp: Object.assign(WhatsApp, WhatsApp),
    Alergi: Object.assign(Alergi, Alergi),
    PermintaanRadiologiController: Object.assign(PermintaanRadiologiController, PermintaanRadiologiController),
    OpnameController: Object.assign(OpnameController, OpnameController),
    Farmasi: Object.assign(Farmasi, Farmasi),
    BarangController: Object.assign(BarangController, BarangController),
    DataBarangController: Object.assign(DataBarangController, DataBarangController),
    GudangBarangController: Object.assign(GudangBarangController, GudangBarangController),
    Kepegawaian: Object.assign(Kepegawaian, Kepegawaian),
    SatuSehat: Object.assign(SatuSehat, SatuSehat),
    JadwalController: Object.assign(JadwalController, JadwalController),
    PoliklinikController: Object.assign(PoliklinikController, PoliklinikController),
    BangsalController: Object.assign(BangsalController, BangsalController),
    KamarController: Object.assign(KamarController, KamarController),
    Akutansi: Object.assign(Akutansi, Akutansi),
    AuthController: Object.assign(AuthController, AuthController),
    SuratController: Object.assign(SuratController, SuratController),
    PatientController: Object.assign(PatientController, PatientController),
    Pasien: Object.assign(Pasien, Pasien),
    RegistrationController: Object.assign(RegistrationController, RegistrationController),
    SkriningVisualController: Object.assign(SkriningVisualController, SkriningVisualController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    DoctorController: Object.assign(DoctorController, DoctorController),
    SpesialisController: Object.assign(SpesialisController, SpesialisController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    PembayaranController: Object.assign(PembayaranController, PembayaranController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    setting: Object.assign(setting, setting),
    RawatInapController: Object.assign(RawatInapController, RawatInapController),
    IGDController: Object.assign(IGDController, IGDController),
    KamarOperasiController: Object.assign(KamarOperasiController, KamarOperasiController),
    LaboratoriumController: Object.assign(LaboratoriumController, LaboratoriumController),
    RadiologiController: Object.assign(RadiologiController, RadiologiController),
    RehabilitasiMedikController: Object.assign(RehabilitasiMedikController, RehabilitasiMedikController),
    KategoriPerawatanController: Object.assign(KategoriPerawatanController, KategoriPerawatanController),
    DaftarTarifController: Object.assign(DaftarTarifController, DaftarTarifController),
    TarifTindakanController: Object.assign(TarifTindakanController, TarifTindakanController),
    PenjabController: Object.assign(PenjabController, PenjabController),
}

export default Controllers