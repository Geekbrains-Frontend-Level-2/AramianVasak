import Renderer from "./Renderer";
import CartItem from "./CartItem";

export default class Cart extends Renderer {
  constructor(root) {
    super(root);
    this._items = [];
    this._sum = 0;
    this.getTemplate();
  }

  // отображаю или скрываю общую стоимость и текст пустой корзины
  // вызывается при добавлении/удалении товаров в корзину
  ifEmptyCart() {
    const cartSum = this._child.querySelector(".cart-sum-wrp");
    const cartEmpty = this._child.querySelector(".cart_empty");

    if (this._sum == 0) {
      cartSum.classList.remove("show");
      cartEmpty.classList.add("show");
    } else {
      cartSum.classList.add("show");
      cartEmpty.classList.remove("show");
    }
  }

  // обрабатываю добавление товара в корзину
  add(data) {
    const duplicate = this._items.filter((item) => item._data.id === data.id);

    if (!duplicate[0]) {
      return Promise.resolve(
        this._items.push(
          new CartItem(data, this, this._child.querySelector(".cart-items"))
        )
      );
    } else {
      duplicate[0].inc();
    }
  }

  // увеличение общей стоимости в корзине
  incCartSum(data) {
    const cartSum = this._child.querySelector(".cart-sum");
    this._sum += data.price;
    cartSum.innerText = this._sum + "$";
    this.ifEmptyCart();
  }

  // уменьшение общей стоимости в корзине
  decCartSum(data) {
    const cartSum = this._child.querySelector(".cart-sum");
    this._sum -= data.price;
    cartSum.innerText = this._sum + "$";
    this.ifEmptyCart();
  }

  // очищаю корзину
  removeAll() {
    this._items.forEach((item) => item._child.remove());
    this._items.splice(0, this._items.length);
    this._sum = 0;
    this.ifEmptyCart();
  }

  getTemplate() {
    this._child = document.createElement("div");
    this._child.classList.add("cart");
    this._child.innerHTML = `
      <span class="cart_empty show">Your cart is empty. Add some goodies to be happier... OMNOMNOM!!!</span>
      <ul class="cart-items"></ul>
      <div class="cart-sum-wrp">
      <span class="cart-sum">${this._sum}$</span>
      <button class="cart-clean">DELETE ALL</button>
      </div>`;
    this._child
      .querySelector(".cart-clean")
      .addEventListener("click", this.removeAll.bind(this));
    this.render();
  }
}
