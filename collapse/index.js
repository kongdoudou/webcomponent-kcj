
import Collapse from './collapse.js';
import CollapseItem from './collapse-item.js';


window.customElements.define('lequ-collapse', Collapse);
window.customElements.define('lequ-collapse-item', CollapseItem);

// 设置组件默认展示状态
let defaultActive = ["1", "3"];

document.querySelector('lequ-collapse').setAttribute('active', JSON.stringify(defaultActive));

document.querySelector('lequ-collapse').addEventListener('nameChange', e => {
  let {name, isShow} = e.detail;
  if(isShow) {
    defaultActive.push(name);
  } else {
    let index = defaultActive.indexOf(name);
    defaultActive.splice(index, 1);
  }
  document.querySelector('lequ-collapse').setAttribute('active', JSON.stringify(defaultActive));
});

