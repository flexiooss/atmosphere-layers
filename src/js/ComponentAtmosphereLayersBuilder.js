import {ComponentAtmosphereLayersPublicHandler} from './component/ComponentAtmosphereLayersPublicHandler'
import {ComponentAtmosphereLayers} from './component/ComponentAtmosphereLayers'
import {LayersViewContainer} from './views/LayersViewContainer'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'

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
  /**
   *
   * @param {HotBalloonApplication} application
   * @param {LayersStyle} layersStyle
   * @param {Element} parentNode
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  static build(application, layersStyle, parentNode) {
console.log(application)

    assertType(
      TypeCheck.isHotballoonApplication(application),
      'ComponentAtmosphereLayersBuilder:constructor: `APP` argument should be an instanceof HotballoonApplication, %s given',
      application.constructor.name)

    return new ComponentAtmosphereLayersPublicHandler(
      new ComponentAtmosphereLayers(
        application.addComponentContext(),
        layersViewContainerBuilder,
        layersStyle,
        parentNode
      )
    )
  }

}
