import API from './API'
import MenuController from './MenuController'
import AuthController from './AuthController'
import PatientController from './PatientController'
import EmployeeController from './EmployeeController'
import MenuController from './MenuController'
import PatientController from './PatientController'
import RegPeriksaController from './RegPeriksaController'
import RawatJalanController from './RawatJalanController'

const actions = {
  EmployeeController: Object.assign(EmployeeController, EmployeeController),
  MenuController: Object.assign(MenuController, MenuController),
  PatientController: Object.assign(PatientController, PatientController),
  RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
  RawatJalanController: Object.assign(RawatJalanController, RawatJalanController),
}

export default actions