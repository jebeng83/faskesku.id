import suratSehat from './surat-sehat'
import suratSakit from './surat-sakit'

const publicMethod = {
    suratSehat: Object.assign(suratSehat, suratSehat),
    suratSakit: Object.assign(suratSakit, suratSakit),
}

export default publicMethod