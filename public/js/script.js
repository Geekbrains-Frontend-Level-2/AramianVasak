document.body.innerHTML = `
<header class="header">
<h1>Cookies shop</h1></header>
<main class="main"></main>`;
const HEADER = document.querySelector("header");
const MAIN = document.querySelector("main");

class Renderer {
  constructor(root) {
    this._root = root;
    this._child;
  }

  render() {
    this._root.appendChild(this._child);
  }
}

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
    <button class="item-btn">ADD&nbsp;TO CART</button>`;

    this._child
      .querySelector(".item-btn")
      .addEventListener("click", this.addToCart.bind(this));

    this.render();
  }
}

class CartItem extends Renderer {
  constructor(data, cart) {
    super();
    this._root = cart._child.querySelector(".cart-items");
    this._data = data;
    this._cart = cart;
    this._amount = 1;
    this._totalPrice = data.price;
    this.getTemplate();
    this.render();
    this.incCartSum();
  }

  // увеличение общей стоимости в корзине
  incCartSum() {
    const cartSum = this._cart._child.querySelector(".cart-sum");
    this._cart._sum += this._data.price;
    cartSum.innerText = this._cart._sum + "$";
    this._cart.ifEmptyCart();
  }

  // уменьшение общей стоимости в корзине
  decCartSum() {
    const cartSum = this._cart._child.querySelector(".cart-sum");
    this._cart._sum -= this._data.price;
    cartSum.innerText = this._cart._sum + "$";
    this._cart.ifEmptyCart();
  }

  // увеличиваю кол-во товаров и стоимость позиции в корзине
  inc() {
    this.incCartSum();

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
      this.decCartSum();

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
    for (let i = 0; i < this._cart._items.length; i++) {
      if (this._data.id == this._cart._items[i]._data.id) {
        indexOfItem = i;
      }
    }

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

class Cart extends Renderer {
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
      return Promise.resolve(this._items.push(new CartItem(data, this)));
    } else {
      duplicate[0].inc();
    }
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
    <span class="cart_empty show">Your cart is&nbsp;empty. Add some goodies to&nbsp;be&nbsp;happier... OMNOMNOM!!!</span>
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

class CartBtn extends Renderer {
  constructor(root) {
    super(root);
    this._cart = document.querySelector(".cart");
    this.getTemplate();
  }

  displayCart() {
    this._cart.classList.toggle("show");
  }

  getTemplate() {
    this._child = document.createElement("button");
    this._child.classList.add("cart-btn");
    this._child.innerHTML = `
    <svg class="cart-btn-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 
    2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 
    0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 
    16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>`;
    this._child.addEventListener("click", this.displayCart.bind(this));
    this.render(this._root);
  }
}

class ItemsList {
  constructor() {
    this._arr = [];
    this.fetchData();
  }

  fetchData() {
    fetch("./data/items.json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this._arr = res.items.map((item) => {
          return new Item(MAIN, item, cart);
        });
      });
  }
}

const arr = new ItemsList();
const cart = new Cart(HEADER);
const cartBtn = new CartBtn(HEADER);