import batches from './batches'
import items from './items'

const dispatch = {
    batches: Object.assign(batches, batches),
    items: Object.assign(items, items),
}

export default dispatch