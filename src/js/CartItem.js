import Renderer from './Renderer'

export default class CartItem extends Renderer {
  constructor(data, cart, root) {
    super(root);
    this._data = data;
    this._cart = cart;
    this._amount = 1;
    this._totalPrice = data.price;
    this.getTemplate();
    this.render();
    this.incSum();
  }

  // вызов incCartSum из корзины
  incSum() {
    this._cart.incCartSum(this._data);
  }

  // вызов decCartSum из корзины
  decSum() {
    this._cart.decCartSum(this._data);
  }

  // увеличиваю кол-во товаров и стоимость позиции в корзине
  inc() {
    this.incSum();

    this._amount++;
    this._totalPrice = this._amount * this._data.price;

    this._child.querySelector(".cart-item-amount").innerText =
      "x" + this._amount;
    this._child.querySelector(".cart-item-sum").innerText =
      this._totalPrice + "$";
  }

  // уменьшаю кол-во товаров и стоимость позиции в корзине
  dec() {
    if (this._amount == 1) {
      this.remove();
    } else {
      this.decSum();

      this._amount--;
      this._totalPrice = this._amount * this._data.price;

      this._child.querySelector(".cart-item-amount").innerText =
        "x" + this._amount;
      this._child.querySelector(".cart-item-sum").innerText =
        this._totalPrice + "$";
    }
  }

  // удаление позиции товара из корзины
  remove() {
    let indexOfItem;

    this._cart._items.forEach((item, i) => {
      if (item._data.id == this._data.id) {
        indexOfItem = i;
      }
    });

    this._cart._items.splice(indexOfItem, 1);
    this._child.remove();

    this._cart._sum -= this._totalPrice;

    this._cart._child.querySelector(".cart-sum").innerText =
      this._cart._sum + "$";
    this._cart.ifEmptyCart();
  }

  getTemplate() {
    this._child = document.createElement("li");
    this._child.classList.add("cart-item");
    this._child.setAttribute("id", this._data.id);
    this._child.innerHTML = `
      <span class="cart-item-name">${this._data.name}</span>
      <span class="item-price">${this._data.price}$</span>
      <button class="cart-item-dec">-</button>
      <span class="cart-item-amount">x${this._amount}</span>
      <button class="cart-item-inc">+</button>
      <span class="cart-item-sum">${this._totalPrice}$</span>
      <button class="cart-item-remove">DELETE</button>
      `;
    this._child
      .querySelector(".cart-item-dec")
      .addEventListener("click", this.dec.bind(this));
    this._child
      .querySelector(".cart-item-inc")
      .addEventListener("click", this.inc.bind(this));
    this._child
      .querySelector(".cart-item-remove")
      .addEventListener("click", this.remove.bind(this));
  }
}
