import PerusahaanPasienController from './PerusahaanPasienController'
import BahasaPasienController from './BahasaPasienController'
import SukuBangsaController from './SukuBangsaController'
import CacatFisikController from './CacatFisikController'
const Pasien = {
    PerusahaanPasienController: Object.assign(PerusahaanPasienController, PerusahaanPasienController),
BahasaPasienController: Object.assign(BahasaPasienController, BahasaPasienController),
SukuBangsaController: Object.assign(SukuBangsaController, SukuBangsaController),
CacatFisikController: Object.assign(CacatFisikController, CacatFisikController),
}

export default Pasien