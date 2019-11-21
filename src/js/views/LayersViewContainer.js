import {ViewContainer} from '@flexio-oss/hotballoon'
import {LayersContainer} from './LayersContainer.view'

export class LayersViewContainer extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {PublicStoreHandler<Layers>} layersStore
   * @param {LayersStyle} layersStyle
   */
  constructor(viewContainerParameters, layersStore,layersStyle) {
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
     * @type {Layers}
     * @private
     */
    this.__viewLayersContainer = this.__registerViewLayoutContainer()

    this.__handleEvents()
  }

  __registerViewLayoutContainer() {
    return this.addView(
      new LayersContainer(
        this,
        this.__store,
        this.__layersStyle
      )
    )
  }

  __handleEvents() {

  }

  /**
   *
   * @param id
   * @return {Element}
   */
  getElementByLayerId(id) {
    return this.__viewLayersContainer.nodeRef(id)
  }
}
