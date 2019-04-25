/* global HTMLElement,customElements */
class LayersContainer extends HTMLElement {
  connectedCallback() {
    console.log('LayersContainer custom element is on the page!')
  }

  disconnectedCallback() {
    console.log('LayersContainer element has been removed')
  }
}

class LayersLayer extends HTMLElement {
  constructor() {
    super()
    var shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML =
      `<style>
p {
color: red;
}
</style>
<h2>hello world!</h2>
<slot>some default content</slot>`
  }

  connectedCallback() {
    console.log('LayersLayer custom element is on the page!')
  }

  disconnectedCallback() {
    console.log('LayersLayer element has been removed')
  }
}

customElements.define('layers-container', LayersContainer)
customElements.define('layers-layer', LayersLayer)
