import AkutansiController from './AkutansiController'
import RekeningController from './RekeningController'
import AkunBayarController from './AkunBayarController'
import AkunPiutangController from './AkunPiutangController'
import JurnalController from './JurnalController'
import CashFlowController from './CashFlowController'
import BillingController from './BillingController'
import NotaJalanController from './NotaJalanController'
import DetailNotaJalanController from './DetailNotaJalanController'
import PiutangPasienController from './PiutangPasienController'
import DetailPiutangPasienController from './DetailPiutangPasienController'
import SetAkunController from './SetAkunController'

const Akutansi = {
    AkutansiController: Object.assign(AkutansiController, AkutansiController),
    RekeningController: Object.assign(RekeningController, RekeningController),
    AkunBayarController: Object.assign(AkunBayarController, AkunBayarController),
    AkunPiutangController: Object.assign(AkunPiutangController, AkunPiutangController),
    JurnalController: Object.assign(JurnalController, JurnalController),
    CashFlowController: Object.assign(CashFlowController, CashFlowController),
    BillingController: Object.assign(BillingController, BillingController),
    NotaJalanController: Object.assign(NotaJalanController, NotaJalanController),
    DetailNotaJalanController: Object.assign(DetailNotaJalanController, DetailNotaJalanController),
    PiutangPasienController: Object.assign(PiutangPasienController, PiutangPasienController),
    DetailPiutangPasienController: Object.assign(DetailPiutangPasienController, DetailPiutangPasienController),
    SetAkunController: Object.assign(SetAkunController, SetAkunController),
}

export default Akutansi