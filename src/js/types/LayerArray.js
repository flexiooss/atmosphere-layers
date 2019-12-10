import {assertType, isString, isObject} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {FlexArray} from '@flexio-oss/flex-types'

/**
 * @extends {FlexArray<Layer>}
 */
export class LayerArray extends FlexArray {
  _validate(v) {
    assertType(v instanceof globalFlexioImport.io.flexio.atmosphere_layers.types.Layer, 'LayerArray: input should be a Layer')
  }

  /**
   *
   * @return {Array.<Object>}
   */
  toObject() {
    return this.mapToArray(v => v.toObject())
  }

  /**
   *
   * @return {LayerArrayBuilder}
   */
  static builder() {
    return new LayerArrayBuilder()
  }

  /**
   *
   * @param {string} json
   * @return {LayerArrayBuilder}
   */
  static fromJson(json) {
    return LayerArrayBuilder.fromJson(json)
  }

  /**
   *
   * @param {Object} jsonObject
   * @return {LayerArrayBuilder}
   */
  static fromObject(jsonObject) {
    return LayerArrayBuilder.fromObject(jsonObject)
  }

  /**
   *
   * @param {LayerArray} instance
   * @return {LayerArrayBuilder}
   */
  static from(instance) {
    return LayerArrayBuilder.from(instance)
  }
}

export class LayerArrayBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param { Layer[] } layers
   * @returns {LayerArrayBuilder}
   */
  values(layers) {
    this._values = layers
    return this
  }

  /**
   * @param { Layer } layer
   * @returns {LayerArrayBuilder}
   */
  pushValue(layer) {
    assertType(layer instanceof globalFlexioImport.io.flexio.atmosphere_layers.types.Layer, 'LayerArrayBuilder:pushValue: layer should be an instance of Layer')
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
    assertType(isObject(jsonObject), 'should be Object')
    const builder = new LayerArrayBuilder()
    builder._values = []
    jsonObject.forEach((layer) => {
      builder._values.push(globalFlexioImport.io.flexio.atmosphere_layers.types.LayerBuilder.fromObject(layer).build())
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {LayerArrayBuilder}
   */
  static fromJson(json) {
    assertType(isString(json), 'should be string')
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {LayerArray} instance
   * @returns {LayerArrayBuilder}
   */
  static from(instance) {
    assertType(instance instanceof LayerArray, 'should be LayerArray')
    const builder = new LayerArrayBuilder()
    instance.forEach((layer) => {
      builder.pushValue(globalFlexioImport.io.flexio.atmosphere_layers.types.LayerBuilder.from(layer).build())
    })
    return builder
  }
}
