export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._template = this._container.querySelector('template');
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(element) {
  this._container.prepend(element);
}
}
