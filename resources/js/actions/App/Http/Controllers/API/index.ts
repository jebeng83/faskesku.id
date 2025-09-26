import EmployeeController from './EmployeeController'
import PenjabController from './PenjabController'
import WilayahController from './WilayahController'
import PermissionController from './PermissionController'
import RegPeriksaController from './RegPeriksaController'
import GenerateNoRawatController from './GenerateNoRawatController'
import UserController from './UserController'

const API = {
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    PenjabController: Object.assign(PenjabController, PenjabController),
    WilayahController: Object.assign(WilayahController, WilayahController),
    PermissionController: Object.assign(PermissionController, PermissionController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    GenerateNoRawatController: Object.assign(GenerateNoRawatController, GenerateNoRawatController),
    UserController: Object.assign(UserController, UserController),
}

export default API