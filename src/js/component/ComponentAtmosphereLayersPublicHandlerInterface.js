/**
 * @interface
 */
export class ComponentAtmosphereLayersPublicHandlerInterface {
  /**

   /**
   * @return {LayerHandler}
   */
  addLayer() {
    throw new Error('should be override')
  }

  /**
   *
   * @param {Layer} layer
   * @return {?Element}
   */
  getElementByLayer(layer) {
    throw new Error('should be override')
  }

  /**
   *
   * @param {Layer} layer
   */
  dispatchRemoveLayerAction(layer) {
    throw new Error('should be override')
  }

  /**
   *
   * @param {Layer} layer
   * @param {number} order
   */
  dispatchChangeLayerOrderAction(layer, order) {
    throw new Error('should be override')
  }

  hideShowedLayer() {
    throw new Error('should be override')
  }

  /**
   *
   * @return {Layer}
   */
  getShowedLayer() {
    throw new Error('should be override')
  }

  /**
   *
   * @param {Layer} layer
   */
  showLayer(layer) {
    throw new Error('should be override')
  }

  /**
   *
   * @param {Layer} layer
   * @return {?number}
   * @throws {RangeError}
   */
  getLayerOrder(layer) {
    throw new Error('should be override')
  }

  /**
   *
   * @return {PublicStoreHandler<Layers>}
   */
  store() {
    throw new Error('should be override')
  }
}
