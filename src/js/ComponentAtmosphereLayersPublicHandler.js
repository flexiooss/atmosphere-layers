import {assertType, globalFlexioImport} from 'flexio-jshelpers'
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

  /**
   *
   * @param {string} id
   */
  dispatchRemoveLayerAction(id) {
    this[__component].removeLayerAction.dispatch(
      new globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].actions.RemoveLayerBuilder()
        .id(id)
        .build()
    )
  }

  /**
   *
   * @param {string} id
   * @param {number} order
   */
  dipatchChangeLayerOrderAction(id, order) {
    this[__component].changeLayerOrderAction.dispatch(
      new globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].actions.ChangeLayerOrderBuilder()
        .id(id)
        .order(order)
        .build()
    )
  }

  /**
   *
   * @param {string} id
   */
  showLayer(id) {
    this.dipatchChangeLayerOrderAction(id, 0)
  }
}
