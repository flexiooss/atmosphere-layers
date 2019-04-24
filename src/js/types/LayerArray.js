import {FlexArray, globalScope, assertType, FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'

const Layer = globalScope[FLEXIO_IMPORT_OBJECT].io.flexio.@flexio_oss.atmosphere_layers.types.Layer
const LayerBuilder = globalScope[FLEXIO_IMPORT_OBJECT].io.flexio.@flexio_oss.atmosphere_layers.types.LayerBuilder

/**
 * @extends {FlexArray<Layer>}
 */
export class LayerArray extends FlexArray {
  _validate(v) {
    assertType(v instanceof Layer, 'LayerArray: input should be a Layer')
  }

  /**
   *
   * @return {Array.<Object>}
   */
  toObject() {
    return this.mapToArray(v => v.toObject())
  }
}

export class LayerArrayBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param { Layer } layer
   * @returns {LayerArrayBuilder}
   */
  pushValue(layer) {
    assertType(layer instanceof Layer, 'LayerArrayBuilder:pushValue: layer should be an instance of Layer')
    this._values.push(layer)
    return this
  }

  /**
   * @returns {LayerArray}
   */
  build() {
    return new LayerArray(...this._values)
  }

  /**
   * @param {object} jsonObject
   * @returns {LayerArrayBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new LayerArrayBuilder()
    builder._values = []
    jsonObject.forEach((layer) => {
      builder._values.push(LayerBuilder.fromObject(layer).build())
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {LayerArrayBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {LayerArray} instance
   * @returns {LayerArrayBuilder}
   */
  static from(instance) {
    const builder = new LayerArrayBuilder()
    instance.forEach((layer) => {
      builder.pushValue(LayerBuilder.from(layer).build())
    })
    return builder
  }
}
