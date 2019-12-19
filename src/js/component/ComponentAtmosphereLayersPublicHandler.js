import {assertType} from '@flexio-oss/assert'
import {ComponentAtmosphereLayers} from './ComponentAtmosphereLayers'
import {LayerHandler} from './LayerHandler'
import {ComponentAtmosphereLayersPublicHandlerInterface} from './ComponentAtmosphereLayersPublicHandlerInterface'


const __component = Symbol('__component')


/**
 * @implements {ComponentAtmosphereLayersPublicHandlerInterface}
 */
export class ComponentAtmosphereLayersPublicHandler extends ComponentAtmosphereLayersPublicHandlerInterface {
  /**
   *
   * @param {ComponentAtmosphereLayers} component
   */
  constructor(component) {
    super()
    assertType(component instanceof ComponentAtmosphereLayers, 'ComponentAtmosphereLayersPublicHandler:constructor: component argument should be an instanceof ComponentAtmosphereLayers')
    this[__component] = component
  }

  /**
   * @return {LayerHandler}
   */
  addLayer() {

    return new LayerHandler(
      this[__component],
      this[__component].addLayer()
    )

  }

  /**
   *
   * @param {Layer} layer
   * @return {?Element}
   */
  getElementByLayer(layer) {
    return this[__component].getElementByLayerId(layer.id())
  }

  /**
   *
   * @param {Layer} layer
   */
  dispatchRemoveLayerAction(layer) {
    this[__component].removeLayerAction.dispatch(
      this[__component].removeLayerAction.payloadBuilder()
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
      this[__component].changeLayerOrderAction.payloadBuilder()
        .id(layer.id())
        .order(order)
        .build()
    )
  }

  hideShowedLayer() {
    this.dispatchChangeLayerOrderAction(this[__component].currentShowedLayer(), 1)
  }

  /**
   *
   * @return {Layer}
   */
  getShowedLayer() {
    return this[__component].currentShowedLayer()
  }

  /**
   *
   * @param {Layer} layer
   */
  showLayer(layer) {
    this.dispatchChangeLayerOrderAction(layer, 0)
  }

  /**
   *
   * @param {Layer} layer
   * @return {?number}
   * @throws {RangeError}
   */
  getLayerOrder(layer) {
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
