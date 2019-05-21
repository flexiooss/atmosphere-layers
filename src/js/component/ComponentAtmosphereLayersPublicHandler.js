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
   * @param {Layer} layer
   * @return {?Element}
   */
  getElementByLayerId(layer) {
    return this[__component].getElementByLayerId(layer.id())
  }

  /**
   *
   * @param {Layer} layer
   */
  dispatchRemoveLayerAction(layer) {
    this[__component].removeLayerAction.dispatch(
      new globalFlexioImport.io.flexio.atmosphere_layers.actions.RemoveLayerBuilder()
        .id(layer.id())
        .build()
    )
  }

  /**
   *
   * @param {Layer} layer
   * @param {number} order
   */
  dispatchChangeLayerOrderAction(layer, order) {
    this[__component].changeLayerOrderAction.dispatch(
      new globalFlexioImport.io.flexio.atmosphere_layers.actions.ChangeLayerOrderBuilder()
        .id(layer.id())
        .order(order)
        .build()
    )
  }

  hideCurrentLayer() {
    this.dispatchChangeLayerOrderAction(this[__component].currentShowedLayer(), 1)
  }

  /**
   *
   * @return {Layer}
   */
  currentShowedLayer() {
    return this[__component].currentShowedLayer()
  }

  /**
   *
   * @param {Layer} layer
   */
  showLayer(layer) {
    this.dispatchChangeLayerOrderAction(layer.id(), 0)
  }

  /**
   *
   * @param {Layer} layer
   * @return {?number}
   * @throws {RangeError}
   */
  orderByLayerId(layer) {
    return this[__component].orderByLayerId(layer.id())
  }

  /**
   *
   * @return {PublicStoreHandler<Layers>}
   */
  store() {
    return this[__component].publicStoreHandler
  }
}
