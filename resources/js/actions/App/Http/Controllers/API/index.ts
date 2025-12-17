import WilayahController from './WilayahController'
import PatientController from './PatientController'
import PenjabController from './PenjabController'
import ReferenceController from './ReferenceController'
import PerusahaanPasienController from './PerusahaanPasienController'
import EmployeeController from './EmployeeController'
import PermissionController from './PermissionController'
import RegPeriksaController from './RegPeriksaController'
import UserController from './UserController'
import DokterController from './DokterController'
import MenuSearchController from './MenuSearchController'

const API = {
    WilayahController: Object.assign(WilayahController, WilayahController),
    PatientController: Object.assign(PatientController, PatientController),
    PenjabController: Object.assign(PenjabController, PenjabController),
    ReferenceController: Object.assign(ReferenceController, ReferenceController),
    PerusahaanPasienController: Object.assign(PerusahaanPasienController, PerusahaanPasienController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    PermissionController: Object.assign(PermissionController, PermissionController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    UserController: Object.assign(UserController, UserController),
    DokterController: Object.assign(DokterController, DokterController),
    MenuSearchController: Object.assign(MenuSearchController, MenuSearchController),
}

export default API