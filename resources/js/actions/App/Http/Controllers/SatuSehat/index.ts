import SatuSehatController from './SatuSehatController'
import PractitionerMappingController from './PractitionerMappingController'
import PelayananRawatJalan from './PelayananRawatJalan'
import SatuSehatAllergyMappingController from './SatuSehatAllergyMappingController'
import SatuSehatMedicationMappingController from './SatuSehatMedicationMappingController'

const SatuSehat = {
    SatuSehatController: Object.assign(SatuSehatController, SatuSehatController),
    PractitionerMappingController: Object.assign(PractitionerMappingController, PractitionerMappingController),
    PelayananRawatJalan: Object.assign(PelayananRawatJalan, PelayananRawatJalan),
    SatuSehatAllergyMappingController: Object.assign(SatuSehatAllergyMappingController, SatuSehatAllergyMappingController),
    SatuSehatMedicationMappingController: Object.assign(SatuSehatMedicationMappingController, SatuSehatMedicationMappingController),
}

export default SatuSehat