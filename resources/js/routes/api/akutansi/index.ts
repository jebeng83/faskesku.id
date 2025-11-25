import notaJalan from './nota-jalan'
import jurnal from './jurnal'
import rekening from './rekening'
import cashflow from './cashflow'
import billing from './billing'
import akunBayar from './akun-bayar'
import akunPiutang from './akun-piutang'
import detailNotaJalan from './detail-nota-jalan'
import piutangPasien from './piutang-pasien'
import detailPiutangPasien from './detail-piutang-pasien'
import pengaturanRekening from './pengaturan-rekening'

const akutansi = {
    notaJalan: Object.assign(notaJalan, notaJalan),
    jurnal: Object.assign(jurnal, jurnal),
    rekening: Object.assign(rekening, rekening),
    cashflow: Object.assign(cashflow, cashflow),
    billing: Object.assign(billing, billing),
    akunBayar: Object.assign(akunBayar, akunBayar),
    akunPiutang: Object.assign(akunPiutang, akunPiutang),
    detailNotaJalan: Object.assign(detailNotaJalan, detailNotaJalan),
    piutangPasien: Object.assign(piutangPasien, piutangPasien),
    detailPiutangPasien: Object.assign(detailPiutangPasien, detailPiutangPasien),
    pengaturanRekening: Object.assign(pengaturanRekening, pengaturanRekening),
}

export default akutansi