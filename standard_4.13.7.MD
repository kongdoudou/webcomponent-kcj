## 4.13.7
部分功能对自定义元素的开发者是可用的，但是对元素的使用者是不可用的。
这些功能通过element.attachInternals()方法被提供，这个方法返回的是ElementInternals的一个实例。
ElementInternals 的属性和方法允许通过内部特性进行控制，这些特性是用户提供给所有的元素的。

给web开发人员（非规范）
element.attachInternals()
返回一个指向自定义元素的 ElementInternals 对象；
如果element不是自定义元素，或者作为元素定义的一部分禁用了“internals”功能，或者在同一元素上调用了两次，则抛出异常。

每一个 HTMLElement 都有一个连接内部的布尔值, 初始值为false.

attachInternals() 方法的逻辑为：   （以下的this为element元素）
1、如果this的is值不为null，则抛出"NotSupportedError"的DOM异常；
2、给定的定义是在给定的节点文档，其名称空间，其本地名称和null（为is值）的情况下查找自定义元素定义的结果。
3、如果定义为null，则抛出"NotSupportedError"的DOM异常；
4、如果定义的 disable internals 为true,则抛出"NotSupportedError"的DOM异常； --不允许访问内容
5、如果this的attached internals 为true,则抛出"NotSupportedError"的DOM异常；
6、如果this的自定义元素的state不是"precustomized" 或者 "custom"，则抛出"NotSupportedError"的DOM异常；
7、把this的attached internals置为true；
8、返回一个目标元素指向this的新的 ElementInternals实例；

### 4.13.7.1 ElementInternals 接口
ElementInternals 接口的描述如下，以下部分中包含各种操作以及属性的定义：
```
[Exposed=Window]
interface ElementInternals {
  // Shadow root access
  readonly attribute ShadowRoot? shadowRoot;

  // Form-associated custom elements
  undefined setFormValue((File or USVString or FormData)? value,
                         optional (File or USVString or FormData)? state);

  readonly attribute HTMLFormElement? form;

  undefined setValidity(optional ValidityStateFlags flags = {},
                        optional DOMString message,
                        optional HTMLElement anchor);
  readonly attribute boolean willValidate;
  readonly attribute ValidityState validity;
  readonly attribute DOMString validationMessage;
  boolean checkValidity();
  boolean reportValidity();

  readonly attribute NodeList labels;
};

// Accessibility semantics
ElementInternals includes ARIAMixin;

dictionary ValidityStateFlags {
  boolean valueMissing = false;
  boolean typeMismatch = false;
  boolean patternMismatch = false;
  boolean tooLong = false;
  boolean tooShort = false;
  boolean rangeUnderflow = false;
  boolean rangeOverflow = false;
  boolean stepMismatch = false;
  boolean badInput = false;
  boolean customError = false;
};
```
每个ElementInternals 都有一个为自定义元素的目标元素。

### 4.13.7.2 Shadow root 访问
给web开发人员（非规范）
internals . shadowRoot
如果目标元素是一个shadow host或者null，internals的目标元素返回一个shadowRoot。
shadowRoot的内部逻辑如下：
1、让target成为this的目标元素；
2、如果target不是一个shadow host，则返回null；
3、让shadow成为target的shadow root；
4、如果shadow的 element internals 的available为false，则返回null；
5、返回shadow。
