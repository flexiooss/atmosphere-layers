import { View, e, RECONCILIATION_RULES } from 'hotballoon'
import style from '../../assets/style.css'

export class LayersContainer extends View {
  /**
   *
   * @param {ViewContainerBase} container
   * @param {PublicStoreHandler<Layers>} layersStore
   */
  constructor(container, layersStore) {
    super(container)
    /**
     *
     * @type {PublicStoreHandler<Layers>}
     * @private
     */
    this.__store = layersStore
    this.subscribeToStore(this.__store)
  }

  /**
   *
   * @return {Element}
   */
  template() {
    return this.html(
      e('layers-container#main' + this.ID)
        .className(style.layersContainer)
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
        layer => {
          return this.html(
            e('layer#' + layer.id)
              .className(style.layersLayer)
              .bindClassName(style.layersLayerActive, layer.order === 0)
              .reconciliationRules(RECONCILIATION_RULES.BYPASS_CHILDREN)
          )
        }
      )
  }
}
