import ResepController from './ResepController'
import ObatController from './ObatController'
import RawatJalanController from './RawatJalanController'

const RawatJalan = {
    ResepController: Object.assign(ResepController, ResepController),
    ObatController: Object.assign(ObatController, ObatController),
    RawatJalanController: Object.assign(RawatJalanController, RawatJalanController),
}

export default RawatJalan