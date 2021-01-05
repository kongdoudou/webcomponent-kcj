class ElementDetails extends HTMLElement{
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    let template = document.getElementById('element-details-template');
    let templateContent = template.content;

    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

customElements.define('element-details', ElementDetails);
