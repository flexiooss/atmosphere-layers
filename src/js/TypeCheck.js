import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {TypeCheck as HotballonTypeCheck} from '@flexio-oss/hotballoon'
import {ComponentAtmosphereLayersPublicHandlerInterface} from './component/ComponentAtmosphereLayersPublicHandlerInterface'

export class TypeCheck {
  /**
   *
   * @param inst
   * @return {boolean}
   */
  static isLayer(inst) {
    return inst instanceof globalFlexioImport.io.flexio.atmosphere_layers.types.Layer
  }

  /**
   *
   * @param inst
   * @return {boolean}
   */
  static isComponentAtmosphereLayersPublicHandler(inst) {
    return inst instanceof ComponentAtmosphereLayersPublicHandlerInterface
  }

  /**
   *
   * @param inst
   * @return {boolean}
   */
  isLayersStore(inst) {
    return (HotballonTypeCheck.isStoreBase(inst) && inst.isTypeOf(globalFlexioImport.io.flexio.atmosphere_layers.types.Layer))
  }
}
