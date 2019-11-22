import '../../generated/io/package.js'
import {ApplicationWithStyle} from '@flexio-oss/hotballoon-test-dummies'
import {ComponentAtmosphereLayersBuilder} from '../js/ComponentAtmosphereLayersBuilder'

const applicationWithStyle = ApplicationWithStyle.withConsoleLogger()

const component = ComponentAtmosphereLayersBuilder.build(
  applicationWithStyle.application(),
  applicationWithStyle.styles().layers(),
  document.body
)

const l1 = component.addLayer()
component.dispatchRemoveLayerAction(l1)
const l2 = component.addLayer()
debugger


const l3 = component.addLayer()
const l4 = component.addLayer()
console.log(component.getElementByLayer(l2))

component.getElementByLayer(l2).innerHTML = '<h1>l2</h1>'
component.getElementByLayer(l3).innerHTML = '<h1>l3</h1>'
component.getElementByLayer(l4).innerHTML = '<h1>It should be show</h1>'

component.showLayer(l3)
component.showLayer(l2)
component.showLayer(l4)

debugger

component.hideShowedLayer()
debugger
component.getElementByLayer(l2).childNodes.forEach((n) => {
  console.log(n)

})

component.dispatchRemoveLayerAction(l2)
component.dispatchRemoveLayerAction(l3)
