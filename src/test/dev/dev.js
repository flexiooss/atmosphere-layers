import '../../../generated/io/package.js'
import {ApplicationWithStyle} from '@flexio-oss/hotballoon-test-dummies'
import {ComponentAtmosphereLayersBuilder} from '../../js/ComponentAtmosphereLayersBuilder'

const applicationWithStyle = ApplicationWithStyle.withConsoleLogger()

const component = ComponentAtmosphereLayersBuilder.build(
  applicationWithStyle.application(),
  applicationWithStyle.styles().layers(),
  document.body
)

const l1 = component.addLayer()
l1.remove()

const l2 = component.addLayer()
debugger

const l3 = component.addLayer()
const l4 = component.addLayer()
console.log(component.getElementByLayer(l2.layer()))

l2.getElement().innerHTML = '<h1>l2</h1>'
l3.getElement().innerHTML = '<h1>l3</h1>'
l4.getElement().innerHTML = '<h1>It should be show</h1>'

l3.show()
l2.show()
l4.show()

debugger

component.hideShowedLayer()
debugger
l2.getElement().childNodes.forEach((n) => {
  console.log(n)

})
l2.remove()
l3.remove()

