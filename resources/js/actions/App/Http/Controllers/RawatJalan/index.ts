import ResepController from './ResepController'
import ObatController from './ObatController'
import TemplatePemeriksaanDokterController from './TemplatePemeriksaanDokterController'
import RawatJalanController from './RawatJalanController'

const RawatJalan = {
    ResepController: Object.assign(ResepController, ResepController),
    ObatController: Object.assign(ObatController, ObatController),
    TemplatePemeriksaanDokterController: Object.assign(TemplatePemeriksaanDokterController, TemplatePemeriksaanDokterController),
    RawatJalanController: Object.assign(RawatJalanController, RawatJalanController),
}

export default RawatJalan