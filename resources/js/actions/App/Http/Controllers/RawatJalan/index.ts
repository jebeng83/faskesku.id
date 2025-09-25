import RawatJalanController from './RawatJalanController'
import ObatController from './ObatController'
import ResepController from './ResepController'

const RawatJalan = {
    RawatJalanController: Object.assign(RawatJalanController, RawatJalanController),
    ObatController: Object.assign(ObatController, ObatController),
    ResepController: Object.assign(ResepController, ResepController),
}

export default RawatJalan