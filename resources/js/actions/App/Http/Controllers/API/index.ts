import WilayahController from './WilayahController'
import EmployeeController from './EmployeeController'
import PenjabController from './PenjabController'
import PatientController from './PatientController'
import ReferenceController from './ReferenceController'
import PerusahaanPasienController from './PerusahaanPasienController'
import PermissionController from './PermissionController'
import RegPeriksaController from './RegPeriksaController'
import UserController from './UserController'
import DokterController from './DokterController'
import MenuSearchController from './MenuSearchController'

const API = {
    WilayahController: Object.assign(WilayahController, WilayahController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    PenjabController: Object.assign(PenjabController, PenjabController),
    PatientController: Object.assign(PatientController, PatientController),
    ReferenceController: Object.assign(ReferenceController, ReferenceController),
    PerusahaanPasienController: Object.assign(PerusahaanPasienController, PerusahaanPasienController),
    PermissionController: Object.assign(PermissionController, PermissionController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    UserController: Object.assign(UserController, UserController),
    DokterController: Object.assign(DokterController, DokterController),
    MenuSearchController: Object.assign(MenuSearchController, MenuSearchController),
}

export default API