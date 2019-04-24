import { globalScope, FLEXIO_IMPORT_OBJECT, deepKeyAssigner } from 'flexio-jshelpers'
import { LayerArray, LayerArrayBuilder } from './src/js/types/LayerArray'
import './generated/io/package'

/**
 * @property {LayerArray} LayerArray
 */
deepKeyAssigner(globalScope[FLEXIO_IMPORT_OBJECT], 'io.flexio.@flexio_oss.atmosphere_layers.types.LayerArray', LayerArray)
/**
 * @property {LayerArrayBuilder} LayerArrayBuilder
 */
deepKeyAssigner(globalScope[FLEXIO_IMPORT_OBJECT], 'io.flexio.@flexio_oss.atmosphere_layers.types.LayerArrayBuilder', LayerArrayBuilder)

export { ComponentAtmosphereLayers } from './src/js/ComponentAtmosphereLayers'
