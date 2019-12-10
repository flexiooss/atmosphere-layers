import {Sequence} from '@flexio-oss/js-helpers'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {isUndefined} from '@flexio-oss/assert'


export class LayersStoreHandler {
  /**
   *
   * @param {Store<Layers, LayersBuilder>} store
   */
  constructor(store) {
    this.__store = store
    this.__sequence = new Sequence('layer_')
  }

  /**
   * @return {Layers}
   * @private
   */
  __layers() {
    return this.__store.state().data()
  }

  /**
   *
   * @return {number}
   * @private
   */
  __maxOrder() {
    return this.__layersList().length > 0 ? this.__layersList().length - 1 : 0
  }

  /**
   *
   * @return {Layer}
   */
  getNewLayer() {
    return new globalFlexioImport.io.flexio.atmosphere_layers.types.LayerBuilder()
      .id(this.__sequence.nextID())
      .build()
  }

  /**
   * @return {Layer}
   */
  addLayer(layer) {

    const values = this.__layersList()
    values.push(layer)

    const layers = this.__store.dataBuilder()
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
    const values = this.__layersList()

    this.__store.set(
      this.__store.dataBuilder()
        .values(
          this.__layersList()
            .splice(this.__findLayerIndexById(values, payload.id()), 1)
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
    const values = this.__layersList()

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
      this.__store.dataBuilder()
        .values(new globalFlexioImport.io.flexio.atmosphere_layers.types.LayerList(...layers)
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
    return this.__findLayerIndexById(this.__layersList(), id)
  }

  /**
   *
   * @return {?Layer}
   */
  currentShowedLayer() {
    return (this.__layersList().length) ? this.__layersList().first() : null
  }

  /**
   *
   * @return {LayerList}
   * @private
   */
  __layersList() {
    return this.__layers().values()
  }

  /**
   *
   * @param {LayerList} layerArray
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
   * @param {LayerList} layerArray
   * @param {string} id
   * @return {Layer}
   * @throws {RangeError}
   * @private
   */
  __findLayerById(layerArray, id) {
    const layer = layerArray.find(current => current.id() === id)
    if (isUndefined(layer)) {
      throw new RangeError('Layer not found : ' + id)
    }
    return layer
  }
}
