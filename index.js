import './generated/io/package'
import {deepKeyAssigner} from '@flexio-oss/js-type-helpers'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {LayerArray, LayerArrayBuilder} from './src/js/types/LayerArray'

/**
 * @property {LayerArray} LayerArray
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.atmosphere_layers.types.LayerArray', LayerArray)

/**
 * @property {LayerArrayBuilder}  LayerArrayBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.atmosphere_layers.types.LayerArrayBuilder', LayerArrayBuilder)

export {ComponentAtmosphereLayersBuilder} from './src/js/ComponentAtmosphereLayersBuilder'

export {TypeCheck} from './src/js/TypeCheck'

export {FakeComponentAtmosphereLayersPublicHandler} from './src/test/FakeComponentAtmosphereLayersPublicHandler'
