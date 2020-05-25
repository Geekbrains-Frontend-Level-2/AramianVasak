document.body.innerHTML = `
<header class="header"></header>
<main class="main"></main>
<footer class="footer"></footer>
`;
const HEADER = document.querySelector("header");
const MAIN = document.querySelector("main");
const FOOTER = document.querySelector("footer");

class Renderer {
  constructor(root) {
    this._root = root;
    this._child;
  }

  getTemplate() {}

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

  getTemplate() {
    this._child = document.createElement("div");
    this._child.classList.add("item");
    this._child.innerHTML = `
    <span class="item-title">${this._data.name}</span>
    <span class="item-price">${this._data.price}$</span>
    <img  class="item-img" src="img/${this._data.img}" alt="${this._data.name} image"/>
    <button class="item-btn">ADD TO CART</button>`;
    this._child
      .querySelector(".item-btn")
      .addEventListener("click", this.addToCart.bind(this));
    this.render();
  }
}

class CartItem extends Renderer {
  constructor(data, cart) {
    super();
    this._root = cart._child.querySelector("ul");
    this._data = data;
    this._amount = 1;
    this._cart = cart;
    this._totalPrice = data.price;
    this.getTemplate();
    this.render();
  }

  inc() {
    this._cart._sum;
    this._amount++;
    this._totalPrice = this._amount * this._data.price;
    this._child.querySelector(".cart-item-amount").innerText =
      "x" + this._amount;
    this._child.querySelector(".cart-item-sum").innerText =
      this._totalPrice + "$";
  }

  dec() {
    if (this._amount == 1) {
      return;
    } else {
      this._amount--;
      this._totalPrice = this._amount * this._data.price;
      this._child.querySelector(".cart-item-amount").innerText =
        "x" + this._amount;
      this._child.querySelector(".cart-item-sum").innerText =
        this._totalPrice + "$";
    }
  }

  remove() {
    this._cart._items.forEach((item) => {});
  }

  getTemplate() {
    this._child = document.createElement("li");
    this._child.classList.add("cart-item");
    this._child.innerHTML = `
    <span class="cart-item-name">${this._data.name}</span>
    <span class="cart-item-price">${this._data.price}$</span>
    <span class="cart-item-amount">x${this._amount}</span>
    <span class="cart-item-sum">${this._totalPrice}$</span>
    <button class="cart-item-dec">—</button>
    <button class="cart-item-remove">DELETE</button>
    `;
    this._child
      .querySelector(".cart-item-dec")
      .addEventListener("click", this.dec.bind(this));
  }
}

class Cart extends Renderer {
  constructor(root) {
    super(root);
    this._items = [];
    this._sum;
    this.getTemplate();
  }

  ifEmpty() {}

  add(data) {
    const duplicate = this._items.filter((item) => item._data.id === data.id);

    if (!duplicate[0]) {
      return Promise.resolve(this._items.push(new CartItem(data, cart))).then(
        () => {
          this.render();
          this._child
            .querySelector(".cart-item-remove")
            .addEventListener("click", this.removeItem.bind(this));
        }
      );
    } else {
      duplicate[0].inc();
    }
  }

  removeItem() {
    console.log("remove");
    
  }

  removeAll() {}

  getTemplate() {
    this._child = document.createElement("div");
    this._child.classList.add("cart");
    this._child.innerHTML = `
    <span class="cart_empty">Your cart is empty. Add some goodies to be happier... OMNOMNOM!!!</span>
    <ul class="cart-items"></ul>
    <span class="cart-sum">${this._sum}$</span>`;
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
    fetch("http://localhost:3000/data/items.json")
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
