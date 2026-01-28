import WilayahController from './WilayahController'
import PatientController from './PatientController'
import PenjabController from './PenjabController'
import ReferenceController from './ReferenceController'
import PerusahaanPasienController from './PerusahaanPasienController'
import DokterController from './DokterController'
import EmployeeController from './EmployeeController'
import PermissionController from './PermissionController'
import RegPeriksaController from './RegPeriksaController'
import KamarInapController from './KamarInapController'
import UserController from './UserController'
import WhatsAppCredentialController from './WhatsAppCredentialController'
import MenuSearchController from './MenuSearchController'

const API = {
    WilayahController: Object.assign(WilayahController, WilayahController),
    PatientController: Object.assign(PatientController, PatientController),
    PenjabController: Object.assign(PenjabController, PenjabController),
    ReferenceController: Object.assign(ReferenceController, ReferenceController),
    PerusahaanPasienController: Object.assign(PerusahaanPasienController, PerusahaanPasienController),
    DokterController: Object.assign(DokterController, DokterController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    PermissionController: Object.assign(PermissionController, PermissionController),
    RegPeriksaController: Object.assign(RegPeriksaController, RegPeriksaController),
    KamarInapController: Object.assign(KamarInapController, KamarInapController),
    UserController: Object.assign(UserController, UserController),
    WhatsAppCredentialController: Object.assign(WhatsAppCredentialController, WhatsAppCredentialController),
    MenuSearchController: Object.assign(MenuSearchController, MenuSearchController),
}

export default API