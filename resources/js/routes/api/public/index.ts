import wilayah from './wilayah'
import pasien from './pasien'
import penjab from './penjab'
import perusahaanPasien from './perusahaan-pasien'
import sukuBangsa from './suku-bangsa'
import bahasaPasien from './bahasa-pasien'
import cacatFisik from './cacat-fisik'

const publicMethod = {
    wilayah: Object.assign(wilayah, wilayah),
    pasien: Object.assign(pasien, pasien),
    penjab: Object.assign(penjab, penjab),
    perusahaanPasien: Object.assign(perusahaanPasien, perusahaanPasien),
    sukuBangsa: Object.assign(sukuBangsa, sukuBangsa),
    bahasaPasien: Object.assign(bahasaPasien, bahasaPasien),
    cacatFisik: Object.assign(cacatFisik, cacatFisik),
}

export default publicMethod