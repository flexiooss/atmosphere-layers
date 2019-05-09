import './generated/io/package'
import { globalFlexioImport, deepKeyAssigner } from 'flexio-jshelpers'
import { LayerArray, LayerArrayBuilder } from './src/js/types/LayerArray'

/**
 * @property {LayerArray} LayerArray
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.atmosphere_layers.types.LayerArray', LayerArray)

/**
 * @property {LayerArrayBuilder}  LayerArrayBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.atmosphere_layers.types.LayerArrayBuilder', LayerArrayBuilder)

export { ComponentAtmosphereLayersBuilder } from './src/js/ComponentAtmosphereLayersBuilder'
