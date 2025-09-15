import EmployeeController from './EmployeeController'
import PenjabController from './PenjabController'
import WilayahController from './WilayahController'
import PermissionController from './PermissionController'
import RegPeriksaController from './RegPeriksaController'
import UserController from './UserController'
<<<<<<< HEAD

const API = {
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    PenjabController: Object.assign(PenjabController, PenjabController),
    WilayahController: Object.assign(WilayahController, WilayahController),
    PermissionController: Object.assign(PermissionController, PermissionController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    UserController: Object.assign(UserController, UserController),
=======
const API = {
    EmployeeController,
PenjabController,
WilayahController,
PermissionController,
RegPeriksaController,
UserController,
>>>>>>> kohsun
}

export default API