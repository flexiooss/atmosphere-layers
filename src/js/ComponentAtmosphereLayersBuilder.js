import {ComponentAtmosphereLayersPublicHandler} from './component/ComponentAtmosphereLayersPublicHandler'
import {ComponentAtmosphereLayers} from './component/ComponentAtmosphereLayers'
import {LayersViewContainer} from './views/LayersViewContainer'
import {Supplier} from '@flexio-oss/extended-flex-types'

/**
 * @type {Supplier<LayersViewContainer>}
 */
const supplier = new Supplier(
  LayersViewContainer,
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {PublicStoreHandler<Layers>} layersStore
   * @param {LayersStyle} layersStyle
   */
  (viewContainerParameters, layersStore, layersStyle) => {
    new LayersViewContainer(
      viewContainerParameters,
      layersStore,
      layersStyle
    )
  }
)

export class ComponentAtmosphereLayersBuilder {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {LayersStyle} layersStyle
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  static build(componentContext, layersStyle) {
    return new ComponentAtmosphereLayersPublicHandler(
      new ComponentAtmosphereLayers(
        componentContext,
        supplier,
        layersStyle
      )
    )
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {LayersStyle} layersStyle
   * @param {Element} parentNode
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  static buildAndMountView(componentContext, layersStyle, parentNode) {
    return new ComponentAtmosphereLayersPublicHandler(
      new ComponentAtmosphereLayers(componentContext, supplier, layersStyle).mountView(parentNode)
    )
  }
}
