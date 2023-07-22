export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsToRender = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._itemsToRender.forEach(item => {
      this._renderedItem = this._renderer(item);
      this.addItem(this._renderedItem);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
