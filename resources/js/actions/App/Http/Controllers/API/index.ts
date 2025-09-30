import EmployeeController from './EmployeeController'
import PenjabController from './PenjabController'
import WilayahController from './WilayahController'
import PermissionController from './PermissionController'
import RegPeriksaController from './RegPeriksaController'
import UserController from './UserController'
import DokterController from './DokterController'

const API = {
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    PenjabController: Object.assign(PenjabController, PenjabController),
    WilayahController: Object.assign(WilayahController, WilayahController),
    PermissionController: Object.assign(PermissionController, PermissionController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    UserController: Object.assign(UserController, UserController),
    DokterController: Object.assign(DokterController, DokterController),
}

export default API