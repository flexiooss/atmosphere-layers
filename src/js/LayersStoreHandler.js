import { Sequence, globalFlexioImport, deepKeyResolver } from 'flexio-jshelpers'

/**
 *
 * @type {LayerBuilder}
 */
const LayerBuilder = deepKeyResolver(globalFlexioImport, 'io.flexio.@flexio_oss/atmosphere_layers.types.LayerBuilder')
/**
 *
 * @type {LayersBuilder}
 */
const LayersBuilder = deepKeyResolver(globalFlexioImport, 'io.flexio.@flexio_oss/atmosphere_layers.stores.LayersBuilder')
/**
 *
 * @type {LayerArrayBuilder}
 */
const LayerArrayBuilder = deepKeyResolver(globalFlexioImport, 'io.flexio.@flexio_oss/atmosphere_layers.types.LayerArrayBuilder')

export class LayersStoreHandler {
  /**
   *
   * @param {Store<Layers>} store
   */
  constructor(store) {
    this.__store = store
    this.__sequence = new Sequence('layer_')
  }

  /**
   *@return {Layers}
   * @private
   */
  __layers() {
    return this.__store.state().data
  }

  /**
   *
   * @return {number}
   * @private
   */
  __maxOrder() {
    return this.__layers().values().length > 0 ? this.__layers().values().length - 1 : 0
  }

  /**
   * @return {Layer}
   */
  addLayer() {
    const layer = new LayerBuilder()
      .id(this.__sequence.nextID())
      .build()

    const values = LayerArrayBuilder
      .from(this.__layers().values())
      .pushValue(layer)
      .build()

    const layers = new LayersBuilder()
      .values(values)
      .build()

    return layer
  }
}
