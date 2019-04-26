import { ComponentAtmosphereLayersPublicHandler } from './component/ComponentAtmosphereLayersPublicHandler'
import { ComponentAtmosphereLayers } from './component/ComponentAtmosphereLayers'

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
