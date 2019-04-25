import { ComponentAtmosphereLayersPublicHandler } from './ComponentAtmosphereLayersPublicHandler'
import { ComponentAtmosphereLayers } from './ComponentAtmosphereLayers'

export class ComponentAtmosphereLayersBuilder {
  /**
   *
   * @param {ComponentContext} componentContext
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  static build(componentContext) {
    return new ComponentAtmosphereLayersPublicHandler(
      new ComponentAtmosphereLayers(componentContext)
    )
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Element} parentNode
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  static buildAndMountView(componentContext, parentNode) {
    return new ComponentAtmosphereLayersPublicHandler(
      new ComponentAtmosphereLayers(componentContext).mountView(parentNode)
    )
  }
}
