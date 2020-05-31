// import Renderer from './Renderer'

// export default
class Item extends Renderer {
  constructor(root, data, cart) {
    super(root);
    this._data = data;
    this._cart = cart;
    this.getTemplate();
  }

  addToCart() {
    this._cart.add(this._data);
  }

  // шаблон карточки товара + кнопка с обработчиком addToCart
  getTemplate() {
    this._child = document.createElement("div");
    this._child.classList.add("item");
    this._child.innerHTML = `
      <div class="item-header">
      <span class="item-title">${this._data.name}</span>
      <span class="item-price">${this._data.price}$</span>
      </div>
      <img  class="item-img" src="img/${this._data.img}" alt="${this._data.name} image"/>
      <button class="item-btn">ADD TO CART</button>`;

    this._child
      .querySelector(".item-btn")
      .addEventListener("click", this.addToCart.bind(this));

    this.render();
  }
}
