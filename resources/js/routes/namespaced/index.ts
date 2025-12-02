import farmasi from './farmasi'

const namespaced = {
    farmasi: Object.assign(farmasi, farmasi),
}

export default namespaced