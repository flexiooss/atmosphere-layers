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
  connectedCallback() {
    console.log('LayersLayer custom element is on the page!')
  }

  disconnectedCallback() {
    console.log('LayersLayer element has been removed')
  }
}

customElements.define('layers-container', LayersContainer)
customElements.define('layers-layer', LayersLayer)
