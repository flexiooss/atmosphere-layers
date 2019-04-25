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
    return this[__component].addLayer()
  }

  /**
   *
   * @param {string} id
   * @return {?Element}
   */
  getElementByLayerId(id) {
    return this[__component].getElementByLayerId(id)
  }

  /**
   *
   * @param {Element} parentNode
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  mountView(parentNode) {
    this[__component].mountView(parentNode)
    return this
  }
}
