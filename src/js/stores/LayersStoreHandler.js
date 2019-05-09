import { Sequence, globalFlexioImport } from 'flexio-jshelpers'

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
    const layer = new globalFlexioImport.io.flexio.atmosphere_layers.types.LayerBuilder()
      .id(this.__sequence.nextID())
      .build()

    const values = this.__layersFromCurrentBuilder()
      .pushValue(layer)
      .build()

    const layers = new globalFlexioImport.io.flexio.atmosphere_layers.stores.LayersBuilder()
      .values(values)
      .build()

    this.__store.set(layers)

    return layer
  }

  /**
   *
   * @param {RemoveLayer} payload
   */
  removeLayer(payload) {
    const values = this.__layersFromCurrentBuilder().build()
    const layers = values.toArray()
    layers.splice(this.__findLayerIndexById(values, payload.id()), 1)
    this.__store.set(
      new globalFlexioImport.io.flexio.atmosphere_layers.stores.LayersBuilder()
        .values(new globalFlexioImport.io.flexio.atmosphere_layers.types.LayerArrayBuilder()
          .values(layers)
          .build()
        )
        .build()
    )
  }

  /**
   *
   * @param {ChangeLayerOrder} payload
   */
  changeLayerOrder(payload) {
    let order = payload.order()
    const values = this.__layersFromCurrentBuilder().build()

    if (order < 0) {
      order = 0
    } else if (order > values.length - 1) {
      order = values.length - 1
    }

    const layerIndex = this.__findLayerIndexById(values, payload.id())
    const layer = values.get(layerIndex)
    const layers = values.toArray()

    layers.splice(layerIndex, 1)
    layers.splice(order, 0, layer)

    this.__store.set(
      new globalFlexioImport.io.flexio.atmosphere_layers.stores.LayersBuilder()
        .values(new globalFlexioImport.io.flexio.atmosphere_layers.types.LayerArrayBuilder()
          .values(layers)
          .build()
        )
        .build()
    )
  }

  /**
   *
   * @param {string} id
   * @return {number}
   * @throws {RangeError}
   */
  orderByLayerId(id) {
    return this.__findLayerIndexById(this.__layers().values(), id)
  }

  /**
   *
   * @return {LayerArrayBuilder}
   * @private
   */
  __layersFromCurrentBuilder() {
    return globalFlexioImport.io.flexio.atmosphere_layers.types.LayerArrayBuilder
      .from(this.__layers().values())
  }

  /**
   *
   * @param {LayerArray} layerArray
   * @param {string} id
   * @return {number}
   * @throws {RangeError}
   * @private
   */
  __findLayerIndexById(layerArray, id) {
    const layer = layerArray.findIndex(current => current.id() === id)
    if (layer === -1) {
      throw new RangeError('Layer not found : ' + id)
    }
    return layer
  }

  /**
   *
   * @param {LayerArray} layerArray
   * @param {string} id
   * @return {Layer}
   * @throws {RangeError}
   * @private
   */
  __findLayerById(layerArray, id) {
    const layer = layerArray.find(current => current.id() === id)
    if (layer === undefined) {
      throw new RangeError('Layer not found : ' + id)
    }
    return layer
  }
}
