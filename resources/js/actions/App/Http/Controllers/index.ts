import API from './API'
import PermintaanLabController from './PermintaanLabController'
import MenuController from './MenuController'
import RawatJalan from './RawatJalan'
import PermintaanRadiologiController from './PermintaanRadiologiController'
import OpnameController from './OpnameController'
import PembelianController from './PembelianController'
import BarangController from './BarangController'
import DataBarangController from './DataBarangController'
import Farmasi from './Farmasi'
import GudangBarangController from './GudangBarangController'
import Pcare from './Pcare'
import AuthController from './AuthController'
import PatientController from './PatientController'
import RegistrationController from './RegistrationController'
import EmployeeController from './EmployeeController'
import DoctorController from './DoctorController'
import SpesialisController from './SpesialisController'
import RegPeriksaController from './RegPeriksaController'
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
import PoliklinikController from './PoliklinikController'

const Controllers = {
    API: Object.assign(API, API),
    PermintaanLabController: Object.assign(PermintaanLabController, PermintaanLabController),
    MenuController: Object.assign(MenuController, MenuController),
    RawatJalan: Object.assign(RawatJalan, RawatJalan),
    PermintaanRadiologiController: Object.assign(PermintaanRadiologiController, PermintaanRadiologiController),
    OpnameController: Object.assign(OpnameController, OpnameController),
    PembelianController: Object.assign(PembelianController, PembelianController),
    BarangController: Object.assign(BarangController, BarangController),
    DataBarangController: Object.assign(DataBarangController, DataBarangController),
    Farmasi: Object.assign(Farmasi, Farmasi),
    GudangBarangController: Object.assign(GudangBarangController, GudangBarangController),
    Pcare: Object.assign(Pcare, Pcare),
    AuthController: Object.assign(AuthController, AuthController),
    PatientController: Object.assign(PatientController, PatientController),
    RegistrationController: Object.assign(RegistrationController, RegistrationController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    DoctorController: Object.assign(DoctorController, DoctorController),
    SpesialisController: Object.assign(SpesialisController, SpesialisController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
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
    PoliklinikController: Object.assign(PoliklinikController, PoliklinikController),
}

export default Controllers