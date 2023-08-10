export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderedItem = this._renderer(item);
      this._addItem(this._renderedItem);
    });
  }

  _addItem(element) {
    this._container.append(element);
  }

  addFormItem(element) {
    this._container.prepend(element);
  }
}
