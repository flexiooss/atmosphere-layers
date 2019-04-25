import { globalFlexioImport, deepKeyAssigner } from 'flexio-jshelpers'
import { LayerArray, LayerArrayBuilder } from './src/js/types/LayerArray'
import './generated/io/package'

/**
 * @property {LayerArray} LayerArray
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.@flexio_oss/atmosphere_layers.types.LayerArray', LayerArray)

/**
 * @namespace
 * @property {object}  globalFlexioImport
 * @property {LayerArrayBuilder}  globalFlexioImport.io.flexio.@flexio_oss/atmosphere_layers.types.LayerArrayBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.@flexio_oss/atmosphere_layers.types.LayerArrayBuilder', LayerArrayBuilder)

export { ComponentAtmosphereLayersBuilder } from './src/js/ComponentAtmosphereLayersBuilder'
