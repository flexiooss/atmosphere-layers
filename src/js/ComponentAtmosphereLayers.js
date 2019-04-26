import {
  StoreBuilder,
  InMemoryStoreParams,
  PublicStoreHandler,
  TypeCheck,
  StoreTypeParam,
  ViewContainerParameters,
  ActionBuilder, ActionParams, ActionTypeParam
} from 'hotballoon'
import {assertType, globalFlexioImport, isNull, assert} from 'flexio-jshelpers'
import {LayersViewContainer} from './views/LayersViewContainer'
import {LayersStoreHandler} from './LayersStoreHandler'

/**
 *
 * @type {Layers}
 */
const Layers = globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].stores.Layers

/**
 *
 * @type {LayersBuilder}
 */
const LayersBuilder = globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].stores.LayersBuilder

/**
 *
 * @type {ChangeLayerOrder}
 */
const ChangeLayerOrder = globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].actions.ChangeLayerOrder
/**
 *
 * @type {RemoveLayer}
 */
const RemoveLayer = globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].actions.RemoveLayer

/**
 * @implements {Component}
 */
export class ComponentAtmosphereLayers {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'ComponentAtmosphereLayers:constructor: `componentContext` argument should be a ComponentContext, %s given',
      typeof componentContext
    )

    this.__componentContext = componentContext
    /**
     * @type {?Element}
     */
    this.__parentNode = null
    /**
     *
     * @type {?LayersViewContainer}
     * @private
     */
    this.__viewContainer = null
    /**
     *
     * @type {Store<Layers>}
     * @private
     */
    this.__store = this.__initLayersStore()
    /**
     *
     * @type {PublicStoreHandler<Layers>}
     */
    this.publicStoreHandler = new PublicStoreHandler(this.__store)
    /**
     *
     * @type {LayersStoreHandler}
     * @private
     */
    this.__storeHandler = new LayersStoreHandler(this.__store)

    /**
     *
     * @type {Action<ChangeLayerOrder>}
     */
    this.changeLayerOrderAction = this.__initChangeLayerOrderAction()

    /**
     *
     * @type {Action<RemoveLayer>}
     */
    this.removeLayerAction = this.__initRemoveLayerAction()
  }

  /**
   *
   * @return {Store<Layers>}
   */
  __initLayersStore() {
    return StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          Layers,
          /**
           *
           * @param {Layers} data
           * @return {Layers}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {Layers} data
           * @return {boolean}
           */
          (data) => {
            return true
          },
          /**
           *
           * @param {Object} obj
           * @return {Layers}
           */
          (obj) => LayersBuilder.fromObject(obj).build()
        ),
        new globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].stores.LayersBuilder()
          .values(new globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].types.LayerArrayBuilder().build())
          .build()
      )
    )
  }

  /**
   *
   * @return {Action<ChangeLayerOrder>}
   */
  __initChangeLayerOrderAction() {
    /**
     *
     * @type {Action<ChangeLayerOrder>}
     */
    const action = ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          ChangeLayerOrder,
          v => v,
          /**
           *
           * @param {ChangeLayerOrder} v
           */
          v => {
            assert(!isNull(v.id()) && v.id() !== '', 'ChangeLayerOrderAction:validator')
            assert(!isNull(v.order()), 'ChangeLayerOrderAction:validator')
            return true
          }
        ),
        this.__componentContext.dispatcher()
      )
    )

    action.listenWithCallback((payload) => {
      this.__changeLayerOrder(payload)
    })

    return action
  }

  /**
   *
   * @return {Action<RemoveLayer>}
   */
  __initRemoveLayerAction() {
    const action = ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          RemoveLayer,
          v => v,
          /**
           *
           * @param {RemoveLayer} v
           */
          v => {
            assert(!isNull(v.id()) && v.id() !== '', 'RemoveLayer:validator')
            return true
          }
        ),
        this.__componentContext.dispatcher()
      )
    )
    action.listenWithCallback((payload) => {
      this.__removeLayer(payload)
    })

    return action
  }

  /**
   * @param {Element} parentNode
   * @return {ComponentAtmosphereLayers}
   */
  mountView(parentNode) {
    this.__parentNode = parentNode

    this.__viewContainer = this.__componentContext.addViewContainer(
      new LayersViewContainer(
        new ViewContainerParameters(
          this.__componentContext,
          this.__componentContext.nextID(),
          this.__parentNode
        ),
        this.publicStoreHandler
      )
    )
    this.__viewContainer.renderAndMount()
    return this
  }

  /**
   *
   * @param {string} id
   * @return {?Element}
   */
  getElementByLayerId(id) {
    if (isNull(this.__viewContainer)) {
      return null
    }
    return this.__viewContainer.getElementByLayerId(id)
  }
  /**
   *
   * @param {string} id
   * @return {?number}
   */
  getOrderByLayerId(id) {

    return this.__storeHandler.addLayer()
  }

  /**
   *
   * @return {Layer}
   */
  addLayer() {
    return this.__storeHandler.addLayer()
  }

  /**
   *
   * @param {RemoveLayer} payload
   */
  __removeLayer(payload) {
    return this.__storeHandler.removeLayer(payload)
  }

  /**
   *
   * @param {ChangeLayerOrder} payload
   */
  __changeLayerOrder(payload) {
    return this.__storeHandler.changeLayerOrder(payload)
  }
}
