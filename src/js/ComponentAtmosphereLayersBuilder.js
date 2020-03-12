import {ComponentAtmosphereLayersPublicHandler} from './component/ComponentAtmosphereLayersPublicHandler'
import {ComponentAtmosphereLayers} from './component/ComponentAtmosphereLayers'
import {LayersViewContainer} from './views/LayersViewContainer'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {assertType, TypeCheck as PrimitiveTypeCheck} from '@flexio-oss/assert'
import {isLayers} from '@flexio-oss/js-style-theme-interface'


/**
 *
 * @type {ComponentAtmosphereLayers~LayersViewContainerBuilderClb}
 */
const layersViewContainerBuilder =

  (viewContainerParameters, layersStore, layersStyle) => {
    return new LayersViewContainer(
      viewContainerParameters,
      layersStore,
      layersStyle
    )
  }


export class ComponentAtmosphereLayersBuilder {
  constructor() {
    /**
     *
     * @type {?ComponentContext}
     * @private
     */
    this.__componentContext = null
    /**
     *
     * @type {?LayersStyle}
     * @private
     */
    this.__layersStyle = null
    /**
     *
     * @type {?Element}
     * @private
     */
    this.__parentNode = null
    /**
     *
     * @type {?document}
     * @private
     */
    this.__document = null
  }

  /**
   *
   * @param {HotBalloonApplication} value
   * @return {ComponentAtmosphereLayersBuilder}
   */
  hotballoonApplication(value) {
    assertType(
      TypeCheck.isHotballoonApplication(value),
      'ComponentAtmosphereLayersBuilder:constructor: `APP` argument should be an instanceof HotballoonApplication, %s given',
      value.constructor.name)

    this.__componentContext = value.addComponentContext()
    return this
  }

  /**
   *
   * @param {LayersStyle} value
   * @return {ComponentAtmosphereLayersBuilder}
   */
  layersStyle(value) {
    assertType(
      isLayers(value),
      '`value` should be LayersStyle'
    )
    this.__layersStyle = value
    return this
  }

  /**
   *
   * @param {Element} value
   * @return {ComponentAtmosphereLayersBuilder}
   */
  parentNode(value) {
    PrimitiveTypeCheck.assertIsNode(value)
    this.__parentNode = value
    return this
  }

  /**
   *
   * @param value
   * @return {ComponentAtmosphereLayersBuilder}
   */
  document(value) {
    this.__document = value
    return this
  }

  /**
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  build() {
    return new ComponentAtmosphereLayersPublicHandler(
      new ComponentAtmosphereLayers(
        this.__componentContext,
        layersViewContainerBuilder,
        this.__layersStyle,
        this.__parentNode,
        this.__document
      )
    )
  }

}
