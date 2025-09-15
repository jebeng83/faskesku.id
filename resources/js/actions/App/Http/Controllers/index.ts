import API from './API'
import AuthController from './AuthController'
import PatientController from './PatientController'
import EmployeeController from './EmployeeController'
import RegPeriksaController from './RegPeriksaController'
import RawatJalanController from './RawatJalanController'
import RawatInapController from './RawatInapController'
import IGDController from './IGDController'
import KamarOperasiController from './KamarOperasiController'
import LaboratoriumController from './LaboratoriumController'
import RadiologiController from './RadiologiController'
import RehabilitasiMedikController from './RehabilitasiMedikController'

const Controllers = {
    API: Object.assign(API, API),
    AuthController: Object.assign(AuthController, AuthController),
    PatientController: Object.assign(PatientController, PatientController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    RawatJalanController: Object.assign(RawatJalanController, RawatJalanController),
    RawatInapController: Object.assign(RawatInapController, RawatInapController),
    IGDController: Object.assign(IGDController, IGDController),
    KamarOperasiController: Object.assign(KamarOperasiController, KamarOperasiController),
    LaboratoriumController: Object.assign(LaboratoriumController, LaboratoriumController),
    RadiologiController: Object.assign(RadiologiController, RadiologiController),
    RehabilitasiMedikController: Object.assign(RehabilitasiMedikController, RehabilitasiMedikController),
}

export default Controllers