import {assertType} from 'flexio-jshelpers'
import {ComponentAtmosphereLayers} from './ComponentAtmosphereLayers'

const __component = Symbol('__component')

export class ComponentAtmosphereLayersPublicHandler {
  /**
   *
   * @param {ComponentAtmosphereLayers} component
   */
  constructor(component) {
    assertType(component instanceof ComponentAtmosphereLayers, 'ComponentAtmosphereLayersPublicHandler:constructor: component argument should be an instanceof ComponentAtmosphereLayers')
    this[__component] = component
  }

  /**
   * @return {Layer}
   */
  addLayer() {

  }

  /**
   *
   * @param {String} id
   */
  removeLayerById(id) {

  }

  getElementByLayerId(id){

  }

}
