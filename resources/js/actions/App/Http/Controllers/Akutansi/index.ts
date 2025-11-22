import AkutansiController from './AkutansiController'
import RekeningController from './RekeningController'
import AkunBayarController from './AkunBayarController'
import AkunPiutangController from './AkunPiutangController'
import SetAkunController from './SetAkunController'

const Akutansi = {
    AkutansiController: Object.assign(AkutansiController, AkutansiController),
    RekeningController: Object.assign(RekeningController, RekeningController),
    AkunBayarController: Object.assign(AkunBayarController, AkunBayarController),
    AkunPiutangController: Object.assign(AkunPiutangController, AkunPiutangController),
    SetAkunController: Object.assign(SetAkunController, SetAkunController),
}

export default Akutansi