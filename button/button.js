
class LequBtn extends HTMLElement{
  constructor() {
    super();

    let root = this.attachShadow({mode: 'open'});
    let btn = document.getElementById('btn');

    let cloneBtn = btn.content.cloneNode(true);

    const style=document.createElement('style');
    const types = {
      'primary':{
        backgroundColor:'#409eff',
        color:'#fff'
      },
      'default': {
        backgroundColor:'#c8c9cc',
        color:'#fff'
      }
    };

    let type = this.getAttribute('type') || 'default';

    style.textContent = `
      .lequ-btn{
        outline:none;
        border:none;
        border-radius:4px;
        display:inline-block;
        cursor:pointer;
        padding:6px 20px;
        background:${types[type].backgroundColor};
        color:${types[type].color};
        // background:var(--background-color,${types[type].backgroundColor});
        // color:var(--text-color,${types[type].color});
      }
    `;

    root.appendChild(style);
    root.appendChild(cloneBtn);

  }
}

window.customElements.define('lequ-btn', LequBtn);
