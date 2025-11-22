import rekening from './rekening'
import akunBayar from './akun-bayar'
import akunPiutang from './akun-piutang'
import pengaturanRekening from './pengaturan-rekening'

const akutansi = {
    rekening: Object.assign(rekening, rekening),
    akunBayar: Object.assign(akunBayar, akunBayar),
    akunPiutang: Object.assign(akunPiutang, akunPiutang),
    pengaturanRekening: Object.assign(pengaturanRekening, pengaturanRekening),
}

export default akutansi