import ResepController from './ResepController'
import RawatJalanController from './RawatJalanController'
import ObatController from './ObatController'
import TemplatePemeriksaanDokterController from './TemplatePemeriksaanDokterController'

const RawatJalan = {
    ResepController: Object.assign(ResepController, ResepController),
    RawatJalanController: Object.assign(RawatJalanController, RawatJalanController),
    ObatController: Object.assign(ObatController, ObatController),
    TemplatePemeriksaanDokterController: Object.assign(TemplatePemeriksaanDokterController, TemplatePemeriksaanDokterController),
}

export default RawatJalan