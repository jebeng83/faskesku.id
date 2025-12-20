import API from './API'
import QueueController from './QueueController'
import PermintaanLabController from './PermintaanLabController'
import MenuController from './MenuController'
import RawatJalan from './RawatJalan'
import PermintaanRadiologiController from './PermintaanRadiologiController'
import OpnameController from './OpnameController'
import Farmasi from './Farmasi'
import BarangController from './BarangController'
import DataBarangController from './DataBarangController'
import GudangBarangController from './GudangBarangController'
import Kepegawaian from './Kepegawaian'
import Pcare from './Pcare'
import SatuSehat from './SatuSehat'
import JadwalController from './JadwalController'
import PoliklinikController from './PoliklinikController'
import Akutansi from './Akutansi'
import AuthController from './AuthController'
import PatientController from './PatientController'
import Pasien from './Pasien'
import RegistrationController from './RegistrationController'
import EmployeeController from './EmployeeController'
import DoctorController from './DoctorController'
import SpesialisController from './SpesialisController'
import RegPeriksaController from './RegPeriksaController'
import PembayaranController from './PembayaranController'
import RawatInapController from './RawatInapController'
import ProfileController from './ProfileController'
import setting from './setting'
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
    API: Object.assign(API, API),
    QueueController: Object.assign(QueueController, QueueController),
    PermintaanLabController: Object.assign(PermintaanLabController, PermintaanLabController),
    MenuController: Object.assign(MenuController, MenuController),
    RawatJalan: Object.assign(RawatJalan, RawatJalan),
    PermintaanRadiologiController: Object.assign(PermintaanRadiologiController, PermintaanRadiologiController),
    OpnameController: Object.assign(OpnameController, OpnameController),
    Farmasi: Object.assign(Farmasi, Farmasi),
    BarangController: Object.assign(BarangController, BarangController),
    DataBarangController: Object.assign(DataBarangController, DataBarangController),
    GudangBarangController: Object.assign(GudangBarangController, GudangBarangController),
    Kepegawaian: Object.assign(Kepegawaian, Kepegawaian),
    Pcare: Object.assign(Pcare, Pcare),
    SatuSehat: Object.assign(SatuSehat, SatuSehat),
    JadwalController: Object.assign(JadwalController, JadwalController),
    PoliklinikController: Object.assign(PoliklinikController, PoliklinikController),
    Akutansi: Object.assign(Akutansi, Akutansi),
    AuthController: Object.assign(AuthController, AuthController),
    PatientController: Object.assign(PatientController, PatientController),
    Pasien: Object.assign(Pasien, Pasien),
    RegistrationController: Object.assign(RegistrationController, RegistrationController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    DoctorController: Object.assign(DoctorController, DoctorController),
    SpesialisController: Object.assign(SpesialisController, SpesialisController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    PembayaranController: Object.assign(PembayaranController, PembayaranController),
    RawatInapController: Object.assign(RawatInapController, RawatInapController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    setting: Object.assign(setting, setting),
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