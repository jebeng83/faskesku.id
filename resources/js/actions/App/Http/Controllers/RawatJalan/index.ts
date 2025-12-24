import ObatController from './ObatController'
import RawatJalanController from './RawatJalanController'
import ResepController from './ResepController'

const RawatJalan = {
    ObatController: Object.assign(ObatController, ObatController),
    RawatJalanController: Object.assign(RawatJalanController, RawatJalanController),
    ResepController: Object.assign(ResepController, ResepController),
}

export default RawatJalan