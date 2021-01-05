class CollapseItem extends HTMLElement{
  constructor() {
    super();
    this.isShow = true;

    let root = this.attachShadow({mode: 'open'});

    let templ = document.getElementById('lequ-collapse-item');
    let cloneTemp = templ.content.cloneNode(true);

    const style = document.createElement('style');

    style.innerHTML = `
        :host{
            width:100%;
            display:block
        }
        .title{
            background:#f1f1f1;
            line-height:35px;
            height: 35px;
            cursor:pointer;
            width:100%;
            user-select:none
        }
        .title, .content{
            padding-left:5px
        }
        .content{
            line-height:30px;
        }
    `;
    root.appendChild(style);
    root.appendChild(cloneTemp);

    this.titleElement = root.querySelector('.title');

    this.titleElement.addEventListener('click', () => {
      console.log(this.name, this.isShow);
      this.isShow = !this.isShow;
      // 如何将改动告知到父级元素
      document.querySelector('lequ-collapse').dispatchEvent(new CustomEvent('nameChange', {
        detail: {
          name: this.name,
          isShow: this.isShow
        }
      }))
    })
  }

  static get observedAttributes() {
    return ['active', 'title', 'name']
  }
  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'active':
        this.activeList = JSON.parse(newVal); // 子组件接收父组件的数据
        break;
      case 'title':
        this.titleElement.innerHTML = newVal; // 接收到title属性之后，作为标题
        break;
      case 'name':
        this.name = newVal;
        break;
    }
    if(this.activeList && this.name) {
      const isShow = this.activeList.includes(this.name);
      this.shadowRoot.querySelector('.content').style.display = isShow ? 'block':'none';
      this.isShow = isShow;
    }
  }
}

export default CollapseItem;
