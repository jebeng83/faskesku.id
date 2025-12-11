import ObatController from './ObatController'
import ResepController from './ResepController'
import RawatJalanController from './RawatJalanController'

const RawatJalan = {
    ObatController: Object.assign(ObatController, ObatController),
    ResepController: Object.assign(ResepController, ResepController),
    RawatJalanController: Object.assign(RawatJalanController, RawatJalanController),
}

export default RawatJalan