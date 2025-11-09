import EmployeeController from './EmployeeController'
import PenjabController from './PenjabController'
import PatientController from './PatientController'
import ReferenceController from './ReferenceController'
import WilayahController from './WilayahController'
import PermissionController from './PermissionController'
import RegPeriksaController from './RegPeriksaController'
import UserController from './UserController'
import DokterController from './DokterController'
import MenuSearchController from './MenuSearchController'

const API = {
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    PenjabController: Object.assign(PenjabController, PenjabController),
    PatientController: Object.assign(PatientController, PatientController),
    ReferenceController: Object.assign(ReferenceController, ReferenceController),
    WilayahController: Object.assign(WilayahController, WilayahController),
    PermissionController: Object.assign(PermissionController, PermissionController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    UserController: Object.assign(UserController, UserController),
    DokterController: Object.assign(DokterController, DokterController),
    MenuSearchController: Object.assign(MenuSearchController, MenuSearchController),
}

export default API