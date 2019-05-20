import { assertType, globalFlexioImport } from 'flexio-jshelpers'
import { ComponentAtmosphereLayers } from './ComponentAtmosphereLayers'

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
   *
   * @param {Element} parentNode
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  mountView(parentNode) {
    this[__component].mountView(parentNode)
    return this
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
   * @param {string} id
   */
  dispatchRemoveLayerAction(id) {
    this[__component].removeLayerAction.dispatch(
      new globalFlexioImport.io.flexio.atmosphere_layers.actions.RemoveLayerBuilder()
        .id(id)
        .build()
    )
  }

  /**
   *
   * @param {string} id
   * @param {number} order
   */
  dispatchChangeLayerOrderAction(id, order) {
    this[__component].changeLayerOrderAction.dispatch(
      new globalFlexioImport.io.flexio.atmosphere_layers.actions.ChangeLayerOrderBuilder()
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
    this.dispatchChangeLayerOrderAction(id, 0)
  }

  /**
   *
   * @param {string} id
   * @return {?number}
   * @throws {RangeError}
   */
  orderByLayerId(id) {
    return this[__component].orderByLayerId(id)
  }

  /**
   *
   * @return {PublicStoreHandler<Layers>}
   */
  subscribeToStore(clb) {
    return this[__component].publicStoreHandler
  }
}
