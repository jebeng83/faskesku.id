import departemen from './departemen'
import lokasi from './lokasi'
import lokasi_ranap from './lokasi_ranap'

const mapping = {
    departemen: Object.assign(departemen, departemen),
    lokasi: Object.assign(lokasi, lokasi),
    lokasi_ranap: Object.assign(lokasi_ranap, lokasi_ranap),
}

export default mapping