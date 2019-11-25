import {
  ActionDispatcherBuilder,
  PublicStoreHandler,
  TypeCheck,
  ViewContainerParameters,
  InMemoryStoreBuilder
} from '@flexio-oss/hotballoon'
import {assert, assertType, isNull, TypeCheck as PrimitiveTypeCheck} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {LayersViewContainer} from '../views/LayersViewContainer'
import {LayersStoreHandler} from '../stores/LayersStoreHandler'
import {isLayers} from '@flexio-oss/js-style-theme-interface'
import {RemoveLayerValidator} from '../actions/RemoveLayerValidator'
import {ChangeLayerOrderValidator} from '../actions/ChangeLayerOrderValidator'

/**
 * @callback ComponentAtmosphereLayers~LayersViewContainerBuilderClb
 * @param {ViewContainerParameters} viewContainerParameters
 * @param {PublicStoreHandler<Layers>} layersStore
 * @param {LayersStyle} layersStyle
 * @return {LayersViewContainer}
 */

/**
 * @implements {Component}
 */
export class ComponentAtmosphereLayers {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {ComponentAtmosphereLayers~LayersViewContainerBuilderClb} layersViewContainerBuilder
   * @param {LayersStyle} layersStyle
   * @param {Element} parentNode
   */
  constructor(componentContext, layersViewContainerBuilder, layersStyle, parentNode) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'ComponentAtmosphereLayers:constructor: `componentContext` argument should be a ComponentContext, %s given',
      typeof componentContext
    )

    this.__componentContext = componentContext

    PrimitiveTypeCheck.assertIsFunction(layersViewContainerBuilder)

    /**
     *
     * @type {ComponentAtmosphereLayers~LayersViewContainerBuilderClb}
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

    PrimitiveTypeCheck.assertIsNode(parentNode)
    /**
     * @type {Element}
     */
    this.__parentNode = parentNode
    /**
     *
     * @type {?LayersViewContainer}
     * @private
     */
    this.__viewContainer = null
    /**
     *
     * @type {Store<Layers,LayersBuilder>}
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

    this.__mountView()
  }

  /**
   *
   * @return {Store<Layers, LayersBuilder>}
   * @private
   */
  __initLayersStore() {
    return this.__componentContext.addStore(
      new InMemoryStoreBuilder()
        .type(globalFlexioImport.io.flexio.atmosphere_layers.stores.Layers)
        .initialData(
          new globalFlexioImport.io.flexio.atmosphere_layers.stores.LayersBuilder()
            .values(
              new globalFlexioImport.io.flexio.atmosphere_layers.types.LayerList()
            ).build()
        )
        .build()
    )
  }

  /**
   *
   * @return {ActionDispatcher<ChangeLayerOrder, ChangeLayerOrderBuilder>}
   * @private
   */
  __initChangeLayerOrderAction() {
    /**
     *
     * @type {ActionDispatcher<ChangeLayerOrder, ChangeLayerOrderBuilder>}
     */
    const action = new ActionDispatcherBuilder()
      .dispatcher(this.__componentContext.dispatcher())
      .type(globalFlexioImport.io.flexio.atmosphere_layers.actions.ChangeLayerOrder)
      .validator(new ChangeLayerOrderValidator())
      .build()

      action.listenWithCallback((payload) => {
        this.__changeLayerOrder(payload)
      },
        this.__componentContext
      )


    return action
  }

  /**
   *
   * @param {function(payload:ChangeLayerOrder )} clb
   * @return {ComponentAtmosphereLayers}
   */
  listenChangeLayerOrder(clb) {
      this.changeLayerOrderAction.listenWithCallback(
        clb,
        this.__componentContext)

    return this
  }

  /**
   *
   * @return {ActionDispatcher<RemoveLayer, RemoveLayerBuilder>}
   * @private
   */
  __initRemoveLayerAction() {
    const action = new ActionDispatcherBuilder()
      .dispatcher(this.__componentContext.dispatcher())
      .type(globalFlexioImport.io.flexio.atmosphere_layers.actions.RemoveLayer)
      .validator(new RemoveLayerValidator()
      )
      .build()

      action.listenWithCallback((payload) => {
        this.__removeLayer(payload)
      },
        this.__componentContext
      )

    return action
  }

  /**
   *
   * @param {function(payload:RemoveLayer)} clb
   * @return {ComponentAtmosphereLayers}
   */
  listenRemoveLayer(clb) {
      this.removeLayerAction.listenWithCallback(
        clb,
        this.__componentContext
      )
    return this
  }

  /**
   * @return {ComponentAtmosphereLayers}
   * @private
   */
  __mountView() {

    this.__viewContainer = this.__componentContext
      .addViewContainer(
        this.__layersViewContainerBuilder(
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
    const layer = this.__storeHandler.getNewLayer()

    this.__storeHandler.addLayer(layer)
    return layer
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
   * @private
   */
  __removeLayer(payload) {

    this.__storeHandler.removeLayer(payload)
  }

  /**
   *
   * @param {ChangeLayerOrder} payload
   * @private
   */
  __changeLayerOrder(payload) {
    return this.__storeHandler.changeLayerOrder(payload)
  }

  remove() {
    this.__componentContext.remove()
  }
}
