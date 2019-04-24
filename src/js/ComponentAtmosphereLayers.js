import {StoreBuilder, InMemoryStoreParams, TypeCheck, StoreTypeParam} from 'hotballoon'
import {isNode, assertType, globalScope, FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'

const Layers = globalScope[FLEXIO_IMPORT_OBJECT].io.flexio.@flexio_oss.atmosphere_layers.stores.Layers
const LayersBuilder = globalScope[FLEXIO_IMPORT_OBJECT].io.flexio.@flexio_oss.atmosphere_layers.stores.LayersBuilder

export class ComponentAtmosphereLayers {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Element} parentNode
   */
  constructor(componentContext, parentNode) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'ComponentAtmosphereLayers:constructor: `componentContext` argument should be a ComponentContext, %s given',
      typeof componentContext
    )

    assertType(!!isNode(parentNode),
      'ComponentAtmosphereLayers:constructor: `parentNode` argument should be a NodeType, %s given',
      typeof parentNode
    )

    this.__componentContext = componentContext
    this.__parentNode = parentNode
    /**
     *
     * @type {?LayersViewContainer}
     * @private
     */
    this.__viewContainer = null
    /**
     *
     * @type {Store<Layers>}
     * @private
     */
    this.__layersStore = this.__initLayersStore()
  }

  /**
   *
   * @return {Store<Layers>}
   */
  __initLayersStore() {
    return StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          Layers,
          /**
           *
           * @param {Layers} data
           * @return {Layers}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {Layers} data
           * @return {boolean}
           */
          (data) => {
            return true
          },
          /**
           *
           * @param {Object} obj
           * @return {Layers}
           */
          (obj) => LayersBuilder.fromObject(obj).build()
        ),
        new LayersBuilder().build()
      )
    )
  }

  /**
   *
   * @return {ComponentCounter}
   */
  __initActionIncrementCounter() {
    //TODO implement init actions

  }

  /**
   *
   * @return {ComponentAtmosphereLayers}
   */
  mountView() {
    return this
  }
}
