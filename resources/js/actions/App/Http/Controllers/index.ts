import API from './API'
import MenuController from './MenuController'
import AuthController from './AuthController'
import PatientController from './PatientController'
import EmployeeController from './EmployeeController'
import RegPeriksaController from './RegPeriksaController'
import RawatJalan from './RawatJalan'
import ProfileController from './ProfileController'
import RawatInapController from './RawatInapController'
import IGDController from './IGDController'
import KamarOperasiController from './KamarOperasiController'
import LaboratoriumController from './LaboratoriumController'
import RadiologiController from './RadiologiController'
import RehabilitasiMedikController from './RehabilitasiMedikController'
import DaftarTarifController from './DaftarTarifController'

const Controllers = {
    API: Object.assign(API, API),
    MenuController: Object.assign(MenuController, MenuController),
    AuthController: Object.assign(AuthController, AuthController),
    PatientController: Object.assign(PatientController, PatientController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    RawatJalan: Object.assign(RawatJalan, RawatJalan),
    ProfileController: Object.assign(ProfileController, ProfileController),
    RawatInapController: Object.assign(RawatInapController, RawatInapController),
    IGDController: Object.assign(IGDController, IGDController),
    KamarOperasiController: Object.assign(KamarOperasiController, KamarOperasiController),
    LaboratoriumController: Object.assign(LaboratoriumController, LaboratoriumController),
    RadiologiController: Object.assign(RadiologiController, RadiologiController),
    RehabilitasiMedikController: Object.assign(RehabilitasiMedikController, RehabilitasiMedikController),
    DaftarTarifController: Object.assign(DaftarTarifController, DaftarTarifController),
}

export default Controllers