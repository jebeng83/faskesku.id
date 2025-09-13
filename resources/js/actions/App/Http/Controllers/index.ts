import API from './API'
import AuthController from './AuthController'
import PatientController from './PatientController'
import EmployeeController from './EmployeeController'
import RegPeriksaController from './RegPeriksaController'
import RawatJalanController from './RawatJalanController'

const Controllers = {
    API: Object.assign(API, API),
    AuthController: Object.assign(AuthController, AuthController),
    PatientController: Object.assign(PatientController, PatientController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    RawatJalanController: Object.assign(RawatJalanController, RawatJalanController),
}

export default Controllers