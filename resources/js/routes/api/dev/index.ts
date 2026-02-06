import rawatJalan from './rawat-jalan'
import bootstrap from './bootstrap'
import pcare from './pcare'
import debug from './debug'

const dev = {
    rawatJalan: Object.assign(rawatJalan, rawatJalan),
    bootstrap: Object.assign(bootstrap, bootstrap),
    pcare: Object.assign(pcare, pcare),
    debug: Object.assign(debug, debug),
}

export default dev