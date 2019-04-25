import {Sequence, globalFlexioImport} from 'flexio-jshelpers'

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
    const layer = new globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].types.LayerBuilder()
      .id(this.__sequence.nextID())
      .build()

    const values = globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].types.LayerArrayBuilder
      .from(this.__layers().values())
      .pushValue(layer)
      .build()

    const layers = new globalFlexioImport.io.flexio['@flexio_oss/atmosphere_layers'].stores.LayersBuilder()
      .values(values)
      .build()

    this.__store.set(layers)

    return layer
  }
}
