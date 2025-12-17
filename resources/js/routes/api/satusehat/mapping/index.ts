import departemen from './departemen'
import lokasi from './lokasi'
import lokasi_ranap from './lokasi_ranap'
import lokasi_farmasi from './lokasi_farmasi'
const mapping = {
    departemen: Object.assign(departemen, departemen),
lokasi: Object.assign(lokasi, lokasi),
lokasi_ranap: Object.assign(lokasi_ranap, lokasi_ranap),
lokasi_farmasi: Object.assign(lokasi_farmasi, lokasi_farmasi),
}

export default mapping