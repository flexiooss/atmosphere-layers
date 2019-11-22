import {ViewContainer} from '@flexio-oss/hotballoon'
import {LayersContainer} from './LayersContainer.view'

export class LayersViewContainer extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {PublicStoreHandler<Layers>} layersStore
   * @param {LayersStyle} layersStyle
   */
  constructor(viewContainerParameters, layersStore, layersStyle) {
    super(viewContainerParameters)
    /**
     *
     * @type {PublicStoreHandler<Layers>}
     * @private
     */
    this.__store = layersStore

    /**
     *
     * @type {LayersStyle}
     * @private
     */
    this.__layersStyle = layersStyle
    /**
     *
     * @type {LayersContainer}
     * @private
     */
    this.__viewLayersContainer = this.__registerViewLayoutContainer()

  }

  /**
   *
   * @return {View}
   * @private
   */
  __registerViewLayoutContainer() {
    return this.addView(
      new LayersContainer(
        this,
        this.__store,
        this.__layersStyle
      )
    )
  }

  /**
   *
   * @param id
   * @return {Element}
   */
  getElementByLayerId(id) {
    return this.__viewLayersContainer.nodeRef(id)
  }

  /**
   *
   * @param {Layer} layer
   * @return {Layer}
   */
  addLayer(layer) {

    this.__viewLayersContainer.addLayer(layer)
    this.__viewLayersContainer.shouldNotUpdate()
    return layer
  }

  /**
   *
   * @param {string} layerId
   */
  removeLayer(layerId) {
    this.__viewLayersContainer.removeLayer(layerId)
    this.__viewLayersContainer.shouldNotUpdate()

  }
}
