import { View, e, RECONCILIATION_RULES } from 'hotballoon'
import style from '../../assets/style.css'
import './LayersElement'

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
    console.log(this)
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
        (layer, order) => {
          return this.html(
            e('layers-layer#' + layer.id())
              .className(style.layersLayer)
              .bindClassName(style.layersLayerActive, order === 0)
              .reconciliationRules(RECONCILIATION_RULES.BYPASS_CHILDREN)
          )
        }
      )
  }
}
