import SatuSehatController from './SatuSehatController'
import PractitionerMappingController from './PractitionerMappingController'
import PelayananRawatJalan from './PelayananRawatJalan'
import SatuSehatAllergyMappingController from './SatuSehatAllergyMappingController'

const SatuSehat = {
    SatuSehatController: Object.assign(SatuSehatController, SatuSehatController),
    PractitionerMappingController: Object.assign(PractitionerMappingController, PractitionerMappingController),
    PelayananRawatJalan: Object.assign(PelayananRawatJalan, PelayananRawatJalan),
    SatuSehatAllergyMappingController: Object.assign(SatuSehatAllergyMappingController, SatuSehatAllergyMappingController),
}

export default SatuSehat