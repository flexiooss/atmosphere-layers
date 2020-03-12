import {
  ActionDispatcherBuilder,
  PublicStoreHandler,
  ViewContainerParameters,
  InMemoryStoreBuilder
} from '@flexio-oss/hotballoon'
import {isNull, isString} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {LayersStoreHandler} from '../stores/LayersStoreHandler'
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
   * @param {document} document
   */
  constructor(componentContext, layersViewContainerBuilder, layersStyle, parentNode, document) {

    /**
     *
     * @type {ComponentContext}
     * @private
     */
    this.__componentContext = componentContext

    /**
     *
     * @type {ComponentAtmosphereLayers~LayersViewContainerBuilderClb}
     * @private
     */
    this.__layersViewContainerBuilder = layersViewContainerBuilder

    /**
     *
     * @type {LayersStyle}
     * @private
     */
    this.__layersStyle = layersStyle

    /**
     * @type {Element}
     * @private
     */
    this.__parentNode = parentNode

    /**
     *
     * @type {document}
     * @private
     */
    this.__document = document

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

        const /** @type {boolean} */ isCurrentShowed = this.__storeHandler.currentShowedLayer().id() === payload.id() && payload.order() === 0

        this.__changeLayerOrder(payload)

        if (!isCurrentShowed) {
          this.__restoreFocusAndScroll()
        }

      },
      this.__componentContext
    )

    return action
  }

  /**
   *
   * @return {ComponentAtmosphereLayers}
   * @private
   */
  __restoreFocusAndScroll() {

    /**
     * @type {?Layer}
     */
    const showedLayer = this.__storeHandler.currentShowedLayer()

    /**
     * @type {?Element}
     */
    const layerElement = this.getElementByLayerId(showedLayer.id())

    /**
     * @type {?Element}
     */
    let activeElement = null

    if (!isNull(showedLayer.activeElementId())) {
      activeElement = this.__document.getElementById(showedLayer.activeElementId())
    }
    if (isNull(activeElement)) {
      activeElement = layerElement.querySelector('[tabindex]:not([tabindex="-1"])')
    }
    if (!isNull(activeElement) && activeElement !== this.__document.activeElement) {
      activeElement.focus()
    }
    if (!isNull(showedLayer.scrollLeft())) {
      layerElement.scrollLeft = showedLayer.scrollLeft()
    }
    if (!isNull(showedLayer.scrollTop())) {
      layerElement.scrollTop = showedLayer.scrollTop()
    }

    return this
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
      .validator(new RemoveLayerValidator())
      .build()

    action.listenWithCallback((payload) => {
        const /** @type {boolean} */ isCurrentShowed = this.__storeHandler.currentShowedLayer().id() === payload.id()

        this.__removeLayer(payload)
        this.__restoreFocusAndScroll()
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
    /**
     *
     * @type {?Layer}
     */
    let currentLayerUpdated = null

    if (payload.order() === 0) {
      currentLayerUpdated = this.__updateStateCurrentLayer()
    }

    return this.__storeHandler.changeLayerOrder(payload, currentLayerUpdated)
  }

  /**
   *
   * @return {?Layer}
   * @private
   */
  __updateStateCurrentLayer() {
    /**
     *
     * @type {?Layer}
     */
    let currentLayerUpdated = null

    const currentLayer = this.__storeHandler.currentShowedLayer()

    if (!isNull(currentLayer)) {

      /**
       * @type {?Element}
       */
      const layerElement = this.getElementByLayerId(currentLayer.id())

      /**
       *
       * @type {?string}
       */
      let idActiveElement = null

      if (layerElement.contains(this.__document.activeElement) && isString(this.__document.activeElement.id)) {
        idActiveElement = this.__document.activeElement.id
      }

      /**
       * @type {Layer}
       */
      currentLayerUpdated = globalFlexioImport.io.flexio.atmosphere_layers.types.LayerBuilder
        .from(currentLayer)
        .scrollLeft(layerElement.scrollLeft)
        .scrollTop(layerElement.scrollTop)
        .activeElementId(idActiveElement)
        .build()
    }

    return currentLayerUpdated
  }

  remove() {
    this.__componentContext.remove()
  }
}
