import rekening from './rekening'
import jurnal from './jurnal'
import cashflow from './cashflow'
import billing from './billing'
import akunBayar from './akun-bayar'
import akunPiutang from './akun-piutang'
import notaJalan from './nota-jalan'
import detailNotaJalan from './detail-nota-jalan'
import piutangPasien from './piutang-pasien'
import detailPiutangPasien from './detail-piutang-pasien'
import pengaturanRekening from './pengaturan-rekening'

const akutansi = {
    rekening: Object.assign(rekening, rekening),
    jurnal: Object.assign(jurnal, jurnal),
    cashflow: Object.assign(cashflow, cashflow),
    billing: Object.assign(billing, billing),
    akunBayar: Object.assign(akunBayar, akunBayar),
    akunPiutang: Object.assign(akunPiutang, akunPiutang),
    notaJalan: Object.assign(notaJalan, notaJalan),
    detailNotaJalan: Object.assign(detailNotaJalan, detailNotaJalan),
    piutangPasien: Object.assign(piutangPasien, piutangPasien),
    detailPiutangPasien: Object.assign(detailPiutangPasien, detailPiutangPasien),
    pengaturanRekening: Object.assign(pengaturanRekening, pengaturanRekening),
}

export default akutansi