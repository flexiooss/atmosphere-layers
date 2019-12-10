import {ComponentAtmosphereLayersPublicHandler} from './component/ComponentAtmosphereLayersPublicHandler'
import {ComponentAtmosphereLayers} from './component/ComponentAtmosphereLayers'
import {TypeCheck, ViewContainer} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'


/**
 *
 * @type {ComponentAtmosphereLayers~LayersViewContainerBuilderClb}
 */
const layersViewContainerBuilder =

  (viewContainerParameters, layersStore, layersStyle) => {
    return new ViewContainer(viewContainerParameters)
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
