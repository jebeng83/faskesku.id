import suratSehat from './surat-sehat'
import suratSakit from './surat-sakit'
import suratHamil from './surat-hamil'
import suratNikah from './surat-nikah'

const publicMethod = {
    suratSehat: Object.assign(suratSehat, suratSehat),
    suratSakit: Object.assign(suratSakit, suratSakit),
    suratHamil: Object.assign(suratHamil, suratHamil),
    suratNikah: Object.assign(suratNikah, suratNikah),
}

export default publicMethod