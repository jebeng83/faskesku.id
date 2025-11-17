import encounter from './encounter'
import diagnosa from './diagnosa'
import condition from './condition'
import observation from './observation'
import procedure from './procedure'
import composition from './composition'
import bundle from './bundle'
import pipeline from './pipeline'

const rajal = {
    encounter: Object.assign(encounter, encounter),
    diagnosa: Object.assign(diagnosa, diagnosa),
    condition: Object.assign(condition, condition),
    observation: Object.assign(observation, observation),
    procedure: Object.assign(procedure, procedure),
    composition: Object.assign(composition, composition),
    bundle: Object.assign(bundle, bundle),
    pipeline: Object.assign(pipeline, pipeline),
}

export default rajal