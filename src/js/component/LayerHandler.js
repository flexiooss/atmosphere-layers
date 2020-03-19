import {ComponentAtmosphereLayers} from './ComponentAtmosphereLayers'
import {assertType} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {TypeCheck} from '@flexio-oss/hotballoon'


const __layer = Symbol('__layer')
const __component = Symbol('__component')


export class LayerHandler {
  /**
   *
   * @param {ComponentAtmosphereLayers} component
   * @param {Layer} layer
   */
  constructor(component, layer) {
    assertType(component instanceof ComponentAtmosphereLayers, '`component` argument should be ComponentAtmosphereLayers')
    /**
     *
     * @type {ComponentAtmosphereLayers}
     */
    this[__component] = component
    assertType(layer instanceof globalFlexioImport.io.flexio.atmosphere_layers.types.Layer, '`layer` argument should be Layer')
    /**
     *
     * @type {Layer}
     */
    this[__layer] = layer

  }

  /**
   *
   * @return {Layer}
   */
  layer() {
    return this[__layer]
  }

  remove() {
    this[__component].removeLayerAction.dispatch(
      this[__component].removeLayerAction.payloadBuilder()
        .id(this.layer().id())
        .build()
    )
  }

  /**
   *
   * @return {?Element}
   */
  getElement() {
    return this[__component].getElementByLayerId(this.layer().id())
  }

  /**
   *
   * @return {LayerHandler}
   */
  show() {
    return this.changeOrder(0)
  }

  /**
   *
   * @return {LayerHandler}
   */
  hide() {
    return this.changeOrder(1)
  }

  /**
   *
   * @return {?number}
   */
  order() {
    return this[__component].orderByLayerId(this.layer().id())
  }

  /**
   *
   * @param {number} order
   * @return {LayerHandler}
   */
  changeOrder(order) {
    this[__component].changeLayerOrderAction.dispatch(
      this[__component].changeLayerOrderAction.payloadBuilder()
        .id(this.layer().id())
        .order(order)
        .build()
    )
    return this
  }

  /**
   *
   * @return {boolean}
   */
  isShowed() {
    return this.order() === 0
  }

  /**
   *
   * @param {function(payload:ChangeLayerOrder )} clb
   * @return {LayerHandler}
   */
  listenShow(clb) {
    this[__component].listenChangeLayerOrder(
      (payload) => {
        if (payload.id() === this.layer().id() && payload.order() === 0) {
          clb(payload)
        }
      }
    )

    return this
  }

  /**
   *
   * @param {function(payload:ChangeLayerOrder )} clb
   * @return {LayerHandler}
   */
  listenHide(clb) {
    this[__component].listenChangeLayerOrder(
      (payload) => {
        if (payload.id() === this.layer().id() && this.isShowed() && payload.order() > 0) {
          clb(payload)
        }
      }
    )

    return this
  }

  /**
   *
   * @param {function(payload:RemoveLayer)} clb
   * @return {LayerHandler}
   */
  listenRemove(clb) {
    this[__component].listenRemoveLayer(
      (payload) => {
        if (payload.id() === this.layer().id()) {
          clb(payload)
        }
      }
    )

    return this
  }

  /**
   *
   * @param{View} view
   * @return {LayerHandler}
   */
  associateView(view) {
    assertType(
      TypeCheck.isView(view),
      '`view` should be view'
    )

    this[__component].listenRemoveLayer(
      (payload) => {
        if (payload.id() === this.layer().id()) {
          view.remove()
        }
      }
    )

    return this
  }
}
