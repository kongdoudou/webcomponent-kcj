class Collapse extends HTMLElement{
  constructor() {
    super();

    let root = this.attachShadow({mode: 'open'});

    let templ = document.getElementById('lequ-collapse-templ');
    let cloneTemp = templ.content.cloneNode(true);

    const style = document.createElement('style');
    // :host代表沙箱的根元素
    style.innerHTML = `
        :host{
            display:flex;
            border:1px solid #ebebeb;
            padding:20px 15px;
            border-radius:5px;
        }
        .lequ-collapse{
            width:100%;
        }
        .title{
            font-size:30px;
        }
    `;
    root.appendChild(style);
    root.appendChild(cloneTemp);

    // 获取插槽中的内容
    const slot = root.querySelector('slot');
    // 监控slot中的变化
    slot.addEventListener('slotchange', (e) => {
      this.slotList = e.target.assignedElements(); // 获取插槽中的内容
      this.render();
    })
  }

  // 生命周期
  static get observedAttributes() {
    return ['active']
  }
  // 当 custom element增加、删除、修改自身属性时，被调用
  attributeChangedCallback(name, oldVal, newVal) {
    if(name === 'active') {
      this.activeList = this.getAttribute('active');
      this.render();
    }
  }
  render() {
    // 将属性传递给子元素
    if(this.slotList && this.activeList) {
      [...this.slotList].forEach(child => {
        child.setAttribute('active', this.activeList)
      })
    }
  }
  // 插入到DOM时候执行的回调函数
  connectedCallback() {
    console.log('插入到DOM时候执行的回调函数');
  }
  // 当 custom element从文档DOM中删除时，被调用
  disconnectedCallback() {
    console.log('当 custom element从文档DOM中删除时，被调用');
  }
  // 当 custom element被移动到新的文档时，被调用 (移动到iframe中)
  adoptedCallback() {
    console.log('当 custom element被移动到新的文档时，被调用 (移动到iframe中)');
  }
}

export default Collapse;
