import {
  ActionDispatcherBuilder,
  PublicStoreHandler,
  TypeCheck,
  ViewContainerParameters,
  InMemoryStoreBuilder
} from '@flexio-oss/hotballoon'
import {assert, assertType, isNull} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {LayersViewContainer} from '../views/LayersViewContainer'
import {LayersStoreHandler} from '../stores/LayersStoreHandler'
import {isLayers} from '@flexio-oss/js-style-theme-interface'
import {TypeCheck as ExtendedTypeCheck} from '@flexio-oss/extended-flex-types'

/**
 * @implements {Component}
 */
export class ComponentAtmosphereLayers {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Supplier<LayersViewContainer>} layersViewContainerBuilder
   * @param {LayersStyle} layersStyle
   */
  constructor(componentContext, layersViewContainerBuilder, layersStyle) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'ComponentAtmosphereLayers:constructor: `componentContext` argument should be a ComponentContext, %s given',
      typeof componentContext
    )

    this.__componentContext = componentContext

    assertType(
      ExtendedTypeCheck.isSupplier(layersViewContainerBuilder) && layersViewContainerBuilder.isTypeOf(LayersViewContainer),
      '`layersViewContainerBuilder` should be a LayersViewContainer'
    )

    /**
     *
     * @type {Supplier<LayersViewContainer>}
     * @private
     */
    this.__layersViewContainerBuilder = layersViewContainerBuilder

    assertType(
      isLayers(layersStyle),
      '`layersStyle` should be LayersStyle'
    )
    /**
     *
     * @type {LayersStyle}
     * @private
     */
    this.__layersStyle = layersStyle

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
     * @type {Store<Layers, LayersBuilder>}
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
     * @type {ActionDispatcher<ChangeLayerOrder, ChangeLayerOrderBuilder>}
     */
    this.changeLayerOrderAction = this.__initChangeLayerOrderAction()

    /**
     *
     * @type {ActionDispatcher<RemoveLayer, RemoveLayerBuilder>}
     */
    this.removeLayerAction = this.__initRemoveLayerAction()
  }

  /**
   *
   * @return {Store<Layers, LayersBuilder>}
   */
  __initLayersStore() {
    return new InMemoryStoreBuilder()
      .type(globalFlexioImport.io.flexio.atmosphere_layers.stores.Layers)
      .initialData(
        new globalFlexioImport.io.flexio.atmosphere_layers.stores.LayersBuilder()
          .values(new globalFlexioImport.io.flexio.atmosphere_layers.types.LayerArrayBuilder().build())
          .build()
      )
      .build()
  }

  /**
   *
   * @return {ActionDispatcher<ChangeLayerOrder, ChangeLayerOrderBuilder>}
   */
  __initChangeLayerOrderAction() {
    /**
     *
     * @type {ActionDispatcher<ChangeLayerOrder, ChangeLayerOrderBuilder>}
     */
    const action = new ActionDispatcherBuilder()
      .dispatcher(this.__componentContext.dispatcher())
      .type(globalFlexioImport.io.flexio.atmosphere_layers.actions.ChangeLayerOrder)
      .validator(
        /**
         *
         * @param {ChangeLayerOrder} v
         */
        v => {
          assert(!isNull(v.id()) && v.id() !== '', 'ChangeLayerOrderAction:validator')
          assert(!isNull(v.order()), 'ChangeLayerOrderAction:validator')
          return true
        }
      )
      .build()

    action.listenWithCallback((payload) => {
      this.__changeLayerOrder(payload)
    })

    return action
  }

  /**
   *
   * @return {ActionDispatcher<RemoveLayer, RemoveLayerBuilder>}
   */
  __initRemoveLayerAction() {
    const action = new ActionDispatcherBuilder()
      .dispatcher(this.__componentContext.dispatcher())
      .type(globalFlexioImport.io.flexio.atmosphere_layers.actions.RemoveLayer)
      .validator(
        /**
         *
         * @param {RemoveLayer} v
         */
        v => {
          assert(!isNull(v.id()) && v.id() !== '', 'RemoveLayer:validator')
          return true
        }
      )
      .build()

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

    this.__viewContainer = this.__componentContext
      .addViewContainer(
        this.__layersViewContainerBuilder.get(
          new ViewContainerParameters(
            this.__componentContext,
            this.__componentContext.nextID(),
            this.__parentNode
          ),
          this.publicStoreHandler,
          this.__layersStyle
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
  orderByLayerId(id) {
    return this.__storeHandler.orderByLayerId(id)
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
   * @return {Layer}
   */
  currentShowedLayer() {
    return this.__storeHandler.currentShowedLayer()
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

  remove() {
    this.__componentContext.remove()
  }
}
