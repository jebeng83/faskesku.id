import NotaJalanController from './NotaJalanController'
import JurnalController from './JurnalController'
import AkutansiController from './AkutansiController'
import RekeningController from './RekeningController'
import AkunBayarController from './AkunBayarController'
import AkunPiutangController from './AkunPiutangController'
import CashFlowController from './CashFlowController'
import BillingController from './BillingController'
import DetailNotaJalanController from './DetailNotaJalanController'
import PiutangPasienController from './PiutangPasienController'
import DetailPiutangPasienController from './DetailPiutangPasienController'
import SetAkunController from './SetAkunController'

const Akutansi = {
    NotaJalanController: Object.assign(NotaJalanController, NotaJalanController),
    JurnalController: Object.assign(JurnalController, JurnalController),
    AkutansiController: Object.assign(AkutansiController, AkutansiController),
    RekeningController: Object.assign(RekeningController, RekeningController),
    AkunBayarController: Object.assign(AkunBayarController, AkunBayarController),
    AkunPiutangController: Object.assign(AkunPiutangController, AkunPiutangController),
    CashFlowController: Object.assign(CashFlowController, CashFlowController),
    BillingController: Object.assign(BillingController, BillingController),
    DetailNotaJalanController: Object.assign(DetailNotaJalanController, DetailNotaJalanController),
    PiutangPasienController: Object.assign(PiutangPasienController, PiutangPasienController),
    DetailPiutangPasienController: Object.assign(DetailPiutangPasienController, DetailPiutangPasienController),
    SetAkunController: Object.assign(SetAkunController, SetAkunController),
}

export default Akutansi