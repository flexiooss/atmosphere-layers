'use strict'
import {ViewContainer} from 'hotballoon'
import {LayersContainer} from './LayersContainer.view'

export class LayersViewContainer extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {PublicStoreHandler<Layers>} layersStore
   */
  constructor(viewContainerParameters, layersStore) {
    super(viewContainerParameters)
    /**
     *
     * @type {PublicStoreHandler<Layers>}
     * @private
     */
    this.__store = layersStore
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
        this.__store
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
