import notaJalan from './nota-jalan'
import jurnal from './jurnal'
import tagihan from './tagihan'
import bayarPiutang from './bayar-piutang'
import rekening from './rekening'
import rekeningtahun from './rekeningtahun'
import cashflow from './cashflow'
import bukuBesar from './buku-besar'
import billing from './billing'
import akunBayar from './akun-bayar'
import akunPiutang from './akun-piutang'
import setoranBank from './setoran-bank'
import detailNotaJalan from './detail-nota-jalan'
import piutangPasien from './piutang-pasien'
import detailPiutangPasien from './detail-piutang-pasien'
import pengaturanRekening from './pengaturan-rekening'

const akutansi = {
    notaJalan: Object.assign(notaJalan, notaJalan),
    jurnal: Object.assign(jurnal, jurnal),
    tagihan: Object.assign(tagihan, tagihan),
    bayarPiutang: Object.assign(bayarPiutang, bayarPiutang),
    rekening: Object.assign(rekening, rekening),
    rekeningtahun: Object.assign(rekeningtahun, rekeningtahun),
    cashflow: Object.assign(cashflow, cashflow),
    bukuBesar: Object.assign(bukuBesar, bukuBesar),
    billing: Object.assign(billing, billing),
    akunBayar: Object.assign(akunBayar, akunBayar),
    akunPiutang: Object.assign(akunPiutang, akunPiutang),
    setoranBank: Object.assign(setoranBank, setoranBank),
    detailNotaJalan: Object.assign(detailNotaJalan, detailNotaJalan),
    piutangPasien: Object.assign(piutangPasien, piutangPasien),
    detailPiutangPasien: Object.assign(detailPiutangPasien, detailPiutangPasien),
    pengaturanRekening: Object.assign(pengaturanRekening, pengaturanRekening),
}

export default akutansi