import AuthController from './AuthController'
import SettingController from './SettingController'
import PatientController from './PatientController'
import DataBarangController from './DataBarangController'
import SetHargaObatController from './SetHargaObatController'
import PembelianController from './PembelianController'
import GudangBarangController from './GudangBarangController'
import OpnameController from './OpnameController'
import RiwayatTransaksiGudangBarangController from './RiwayatTransaksiGudangBarangController'
import BarangController from './BarangController'

const Controllers = {
    AuthController: Object.assign(AuthController, AuthController),
    SettingController: Object.assign(SettingController, SettingController),
    PatientController: Object.assign(PatientController, PatientController),
    DataBarangController: Object.assign(DataBarangController, DataBarangController),
    SetHargaObatController: Object.assign(SetHargaObatController, SetHargaObatController),
    PembelianController: Object.assign(PembelianController, PembelianController),
    GudangBarangController: Object.assign(GudangBarangController, GudangBarangController),
    OpnameController: Object.assign(OpnameController, OpnameController),
    RiwayatTransaksiGudangBarangController: Object.assign(RiwayatTransaksiGudangBarangController, RiwayatTransaksiGudangBarangController),
    BarangController: Object.assign(BarangController, BarangController),
}

export default Controllers