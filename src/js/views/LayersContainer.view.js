import {View, e, RECONCILIATION_RULES} from '@flexio-oss/hotballoon'
import './LayersElement'
import {removeChildNodes} from '@flexio-oss/js-type-helpers'

export class LayersContainer extends View {
  /**
   *
   * @param {ViewContainerBase} container
   * @param {PublicStoreHandler<Layers>} layersStore
   * @param {LayersStyle} layersStyle
   */
  constructor(container, layersStore, layersStyle) {
    super(container)
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
    this.subscribeToStore(this.__store)
    console.log(this)

  }

  /**
   *
   * @return {Element}
   */
  template() {
    return this.html(
      e('layers-container#main' + this.ID)
        .className(this.__layersStyle.container())
        .childNodes(
          ...this.__layers()
        )
    )
  }

  /**
   *
   * @return {Array.<Element>}
   * @private
   */
  __layers() {
    /**
     * @type {Layers}
     */
    return this.__store.data()
      .values()
      .mapToArray(
        (layer, order) => {
          return this.html(
            e('layers-layer#' + layer.id())
              .className(this.__layersStyle.layer())
              .bindClassName(order === 0, this.__layersStyle.layerActive())
              .reconciliationRules(RECONCILIATION_RULES.BYPASS_CHILDREN)
          )
        }
      )
  }

  /**
   *
   * @param {Layer} layer
   * @return {Layer}
   */
  addLayer(layer) {
    this.nodeRef('main' + this.ID).appendChild(
      this.html(
        e('layers-layer#' + layer.id())
          .className(this.__layersStyle.layer())
          .reconciliationRules(RECONCILIATION_RULES.BYPASS_CHILDREN)
      )
    )
    return layer
  }

  /**
   *
   * @param {string} layerId
   */
  removeLayer(layerId) {
    removeChildNodes(
      this.nodeRef(layerId)
    )

  }
}
