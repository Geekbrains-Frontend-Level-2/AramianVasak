document.body.innerHTML = `
<header class="header"></header>
<main class="main"></main>
<footer class="footer"></footer>
`;
const main = document.querySelector("main");

/**
 * Смысла в создании класса рендера для дальнейшего наследования не вижу, т.к. нельзя применить
 * логику, как с животными: "Любой item является render, но не любой render является item".
 * @param {object} child DOM element, append to root as child
 * @param {object} root DOM parent element for child. If not set, function will create div.
 */
function render(child, root = main.appendChild(document.createElement("div"))) {
  root ? root.appendChild(child) : main.appendChild(child);
}

class Item {
  /**
   *Creates a single item.
   * @param {string} name
   * @param {number} price
   * @param {string} img Path to image
   */
  constructor(name, price, img) {
    this._name = name;
    this._price = price;
    this._img = img;
    this._template;
    this.getTemplate();
    render(this._template, main);
  }

  addToCart() {
    const arr = productCart.itemsList;
    document.getElementsByClassName("cart-modal_empty")[0].style.display =
      "none";

    arr.push(new CartItem(this._name, this._price, 1));

    let cartSum = document.getElementsByClassName("cart-modal-sum")[0];
    cartSum.style.display = "block";
    let parse = parseInt(cartSum.innerText);
    cartSum.innerText = parse += this._price;
  }

  getTemplate() {
    this._template = document.createElement("div");
    this._template.classList.add("item");
    this._template.innerHTML = `
    <span class="item-title">${this._name}</span>
    <span class="item-price">${this._price}$</span>
    <img  class="item-img" src="img/${this._img}" alt="${this._name} image"/>
    <button class="item-btn">ADD TO CART</button>
    `;

    this._template
      .querySelector("button")
      .addEventListener("click", this.addToCart.bind(this));
  }
}

class ItemsList {
  /**
   *Creates a list of items from array.
   * @param {array} arr Array of items objects.
   */
  constructor(arr) {
    this.arr = arr;
    this.createItems();
  }

  createItems() {
    this.arr.map((item) => {
      return new Item(item.name, item.price, item.img);
    });
  }
}

class Cart {
  constructor() {
    this._btnTemplate;
    this._modalTemplate;
    this.itemsList = [];
    this._sum = 0;
    // this.getBtnTemplate();
    this.getModalTemplate();
    // render(this._btnTemplate, document.querySelector("header"));
    render(this._modalTemplate, document.querySelector("header"));
  }

  // displayModal() {
  //   const cartModal = document.getElementsByClassName("cart-modal");
  //   cartModal.style.display
  // }

  getModalTemplate() {
    this._modalTemplate = document.createElement("div");
    this._modalTemplate.classList.add("cart-modal");
    this._modalTemplate.innerHTML = `
    <span class="cart-modal_empty">Your cart is empty. Add some goodies to be happier... OMNOMNOM!!!</span>
    <ul class="cart-modal-items_list"></ul>
    <span class="cart-modal-sum">${this._sum}$</span>
    `;
  }

  getBtnTemplate() {
    this._btnTemplate = document.createElement("button");
    this._btnTemplate.classList.add("cart-btn");
    this._btnTemplate.innerHTML = `
    <svg class="cart-btn-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>
    `;
    // this._btnTemplate.addEventListener("click", this.getModalTemplate);
  }

  add(item) {
    const cartItemsList = this._modalTemplate.querySelector("ul");
    item.addToCart;
  }
}

class CartItem {
  constructor(name, price, amount) {
    this._name = name;
    this._price = price;
    this._amount = amount;
    this._sum = price * amount;
    this._template;
    this.getTemplate();
    render(this._template, document.querySelector("ul"));
  }

  plusOne(param) {
    param ? this._amount++ : this._amount--;
    let amount = document.getElementsByClassName("cart-item-amount")[0];
    let sum = document.getElementsByClassName("cart-item-sum")[0];
    amount.innerText = "x" + this._amount;
    sum.innerText = parseInt(this._amount) * parseInt(this._price);
  }

  getTemplate() {
    this._template = document.createElement("li");
    this._template.classList.add("cart-modal-items_list-item");
    this._template.innerHTML = `
    <span class="cart-item-name">${this._name}</span>
    <span class="cart-item-price">${this._price}$</span>
    `;
    // <span class="cart-item-amount">x${this._amount}</span>
    // <span class="cart-item-sum">${this._sum}</span>
  }
}

let array = [
  { name: "Chocolate cookie", price: 4, img: "chocolate.jpg" },
  { name: "Gingerbread cookie", price: 3, img: "gingerbread.jpg" },
  { name: "Oat cookie", price: 2, img: "oat.jpg" },
];
const cookies = new ItemsList(array);
const productCart = new Cart();
