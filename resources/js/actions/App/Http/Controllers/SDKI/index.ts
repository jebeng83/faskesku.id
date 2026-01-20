import SdkiController from './SdkiController'
import KategoriSdkiController from './KategoriSdkiController'
import SubKategoriSdkiController from './SubKategoriSdkiController'
import KeluhanSubyektifController from './KeluhanSubyektifController'
import DataObyektifController from './DataObyektifController'

const SDKI = {
    SdkiController: Object.assign(SdkiController, SdkiController),
    KategoriSdkiController: Object.assign(KategoriSdkiController, KategoriSdkiController),
    SubKategoriSdkiController: Object.assign(SubKategoriSdkiController, SubKategoriSdkiController),
    KeluhanSubyektifController: Object.assign(KeluhanSubyektifController, KeluhanSubyektifController),
    DataObyektifController: Object.assign(DataObyektifController, DataObyektifController),
}

export default SDKI