import SatuSehatRajalController from './SatuSehatRajalController'
import ProcedureTindakanController from './ProcedureTindakanController'

const PelayananRawatJalan = {
    SatuSehatRajalController: Object.assign(SatuSehatRajalController, SatuSehatRajalController),
    ProcedureTindakanController: Object.assign(ProcedureTindakanController, ProcedureTindakanController),
}

export default PelayananRawatJalan