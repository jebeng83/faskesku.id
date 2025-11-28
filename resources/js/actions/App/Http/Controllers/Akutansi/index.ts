import NotaJalanController from './NotaJalanController'
import JurnalController from './JurnalController'
import TagihanSadewaController from './TagihanSadewaController'
import BayarPiutangController from './BayarPiutangController'
import AkutansiController from './AkutansiController'
import RekeningController from './RekeningController'
import AkunBayarController from './AkunBayarController'
import AkunPiutangController from './AkunPiutangController'
import BukuBesarController from './BukuBesarController'
import CashFlowController from './CashFlowController'
import BillingController from './BillingController'
import RekeningTahunController from './RekeningTahunController'
import DetailNotaJalanController from './DetailNotaJalanController'
import PiutangPasienController from './PiutangPasienController'
import DetailPiutangPasienController from './DetailPiutangPasienController'
import SetAkunController from './SetAkunController'

const Akutansi = {
    NotaJalanController: Object.assign(NotaJalanController, NotaJalanController),
    JurnalController: Object.assign(JurnalController, JurnalController),
    TagihanSadewaController: Object.assign(TagihanSadewaController, TagihanSadewaController),
    BayarPiutangController: Object.assign(BayarPiutangController, BayarPiutangController),
    AkutansiController: Object.assign(AkutansiController, AkutansiController),
    RekeningController: Object.assign(RekeningController, RekeningController),
    AkunBayarController: Object.assign(AkunBayarController, AkunBayarController),
    AkunPiutangController: Object.assign(AkunPiutangController, AkunPiutangController),
    BukuBesarController: Object.assign(BukuBesarController, BukuBesarController),
    CashFlowController: Object.assign(CashFlowController, CashFlowController),
    BillingController: Object.assign(BillingController, BillingController),
    RekeningTahunController: Object.assign(RekeningTahunController, RekeningTahunController),
    DetailNotaJalanController: Object.assign(DetailNotaJalanController, DetailNotaJalanController),
    PiutangPasienController: Object.assign(PiutangPasienController, PiutangPasienController),
    DetailPiutangPasienController: Object.assign(DetailPiutangPasienController, DetailPiutangPasienController),
    SetAkunController: Object.assign(SetAkunController, SetAkunController),
}

export default Akutansi