## custom elements
共有两种：
1、Autonomous custom elements 是独立的元素，它不继承其他内建的HTML元素。你可以直接把它们写成HTML标签的形式，来在页面上使用。
2、Customized built-in elements 继承自基本的HTML元素。在创建时，你必须指定所需扩展的元素，使用时，需要先写出基本的元素标签，并通过 is 属性指定custom element的名称；

### Customized built-in elements（自定义内置元素）
> Customized built-in elements 继承自基本的HTML元素  
> 在创建时，必须指定所需扩展的元素;  
> 使用时，需要先写出基本的元素标签，并通过 is 属性指定custom element的名称  

定义方法：
```javascript
// 一个 custom element 的类对象，用于定义元素行为
class WordCount extends HTMLParagraphElement{
  constructor() {
    super();
    // 对应的功能代码要写在这里
    this.setAttribute('class', 'test')
  }
}

/* 1、custom element 的名称不能是单个单词，且其中必须要有短横线
2、用于定义元素行为的 类 
3、可选参数，一个包含 extends 属性的配置对象，是可选参数。它指定了所创建的元素继承自哪个内置元素，可以继承任何内置元素
*/
customElements.define('word-count', WordCount, {extends: 'p'});
```

使用方法：
```html
<!-- 第一种使用方法-->
<script>
    document.createElement('p', {is: 'word-count'}); 
</script>
<!-- 第二种使用方法-->
<p is="word-count"></p>
```  

### Autonomous custom elements
```javascript
// Create a class for the element
class PopUpInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create spans
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);

    const info = document.createElement('span');
    info.setAttribute('class', 'info');

    // Take attribute content and put it inside the info span
    const text = this.getAttribute('text');
    info.textContent = text;

    // Insert icon
    let imgUrl;
    if(this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = 'img/default.png';
    }

    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');

    style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 500px;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}

// Define the new element
customElements.define('popup-info', PopUpInfo);
```

使用方法
```html
<!-- 告诉浏览器立即下载，但延迟执行，最好只包含一个延迟脚本  https://segmentfault.com/a/1190000006778717-->
<script src="template&slot/test.js" defer></script>

<popup-info img="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607341871844&di=5afbcbe15258b557fc77da29ed5fd809&imgtype=0&src=http%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D911654674%2C2622349104%26fm%3D193" text="Your card validation code (CVC) is an extra security feature — it is the last 3 or 4 numbers on the back of your card."></popup-info>
```

## 生命周期函数
在custom element的构造函数中，可以指定多个不同的回调函数，他们将会在元素的不同生命周期被调用
connectedCallback：当custom element首次被插入文档DOM时，被调用
disConnectCallback: 当custom element从文档DOM中删除时，被调用
adoptedCallback: 当custom element被移动到新的文档时，被调用
attributeChangedCallback：当custom element增加、删除、修改自身属性时，被调用，可以看到被修改的参数名称以及修改前后的值

```javascript
attributeChangedCallback(name, oldValue, newValue) {
  console.log('Custom square element attributes changed.');
  updateStyle(this);
}
```

## Shadow DOM
Web Components一个重要的属性就是封装 - 可以将标记结构、样式和行为隐藏起来，并与页面上的其他代码相隔离，保证不同的部分不会混在一起，可使代码更加干净、整洁。
Shadow DOM接口是关键所在，它可以将一个隐藏的、独立的DOM附加到一个元素上。

Shadow DOM允许将隐藏的DOM树附加到常规的DOM树中 -- 它以shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的DOM元素一样。
![avatar](https://mdn.mozillademos.org/files/15788/shadow-dom.png)
Shadow DOM 的特有术语
Shadow host:一个常规DOM节点，shadow DOM会被附加到这个节点上
Shadow tree：Shadow DOM内部的DOM树
Shadow boundary: shadow DOM结束的地方，也是常规DOM开始的地方
Shadow root：Shadow tree的根节点

###基本用法
1、使用Element.attachShadow() 方法来将一个shadow root附加到任何一个元素上，它接受一个配置对象作为参数，该对象有一个mode属性，值可以是open和close
open：可以通过页面内的 JavaScript 方法来获取 Shadow DOM
close：不能从外部获取到shadow DOM

2、shadow DOM的样式可以试用行内样式，也可以使用外部引入样式；外部样式引入并不会打断shadow DOM的绘制，因此在加载样式表时可能会出现未添加样式内容，出现闪烁。

## template和slot
>  在webComponent中，可以使用template进行结构和样式的单独书写，然后用node.cloneNode（）方法绑定在shadowDOM的根节点上  
```html
<!--在html中直接写template标签，template中的内容并不会渲染到页面中-->
<template id="paragraph">
    <div class="paragraph">这是一段测试文本</div>
    <style>
        .paragraph{
            line-height:30px;
            background-color: red;
            text-align: center;
        }
    </style>
</template>

<!--可以直接使用自定义标签进行调用-->
<text-box></text-box>
```
```javascript
class TestBox extends HTMLElement{
  constructor() {
    super();
    // 新建shadowDOM
    let shadowRoot = this.attachShadow({mode: 'open'});
    // 获取模板内容
    let template = document.getElementById('paragraph');
    let templateContent = template.content;
    // 将模板内容绑定到shadowRoot上
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}
customElements.define('test-box', TestBox);

```
问题点：如何动态修改结构中的值呢？ -- `使用slot`


slot
1、作用：通过声明式的语法在单个实例中展现不同的结构。
2、兼容性：比template差，在Chrome 53, Opera 40, Safari 10, 火狐 59 和 Edge 79中支持。
3、用法：使用name属性进行标识，可以在模板中定义占位符
4、注意点：如果想要给slot插入的元素添加样式，需要在模板中进行添加,slot中插入的元素不会使用template中定义的样式
```html
<test-box>
    <!--改动点2：在标签中写好一个结构，结构必须指明对应的slot是哪个-->
    <span slot="my-text">"这里是从属性上传递的一段文案"</span>
</test-box>
<template id="paragraph">
    <div class="paragraph">
       <!--改动点1：在template中定义一个slot，用于占位，slot中的文本内容在当前浏览器不支持slot的时候进行展示-->
        <slot name="my-text">这里是template中的文案</slot>
    </div>
    <style>
        .paragraph{
            line-height:30px;
            background-color: red;
            text-align: center;
        }
    </style>
</template>
```





