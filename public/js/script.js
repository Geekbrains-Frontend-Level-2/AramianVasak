document.body.innerHTML = `
<header class="header"></header>
<main class="main"></main>
<footer class="footer"></footer>
`;
const main = document.querySelector("main");

class Item {
  /**
   *Creates a single item.
   * @param {string} name
   * @param {number} price
   * @param {string} img Path to image
   */
  constructor(name, price, img, id) {
    this._name = name;
    this._price = price;
    this._img = img;
    this._id = id;
    this._cart = productCart;
    this._template;

    this.getTemplate();
    this.render(main);
  }

  addToCart() {
    // this._arr.filter(item => item.id == )
    this._cart.add(this);
    this.emptyCart();
    this.show();
  }

  // Скрываем общую стоимость
  show() {
    if (this._cart._sum > 0) {
      document.querySelector(".cart-modal-sum").classList.add("show");
    }
  }

  // Скрываем текст пустой корзины
  emptyCart() {
    if (this._cart._itemsList.length > 0) {
      this._cart._emptyCart.classList.add("hide");
    } else {
      this._cart._emptyCart.classList.remove("hide");
    }
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

  render(root) {
    return Promise.resolve(root.appendChild(this._template));
  }
}

class ItemsList {
  /**
   *Creates a list of items from array.
   * @param {array} arr Array of items objects.
   */
  constructor() {
    this._arr;
    this.fetchItems();
  }

  fetchItems() {
    fetch("https://js-av.herokuapp.com/data/items.json" || "http://localhost:3000/data/items.json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this._arr = res.items.map((item) => {
          return new Item(item.name, item.price, item.img, item.id);
        });
      });
  }
}

class Cart {
  constructor() {
    this._btnTemplate;
    this._modalTemplate;
    this._itemsList = [];
    this._sum = 0;
    this.getBtnTemplate();
    this.getModalTemplate();
    this._emptyCart = document.querySelector(".cart-modal_empty");
    this.render(document.querySelector("header"), this._btnTemplate);
  }

  // На клик навешено отображение модалки
  getBtnTemplate() {
    this._btnTemplate = document.createElement("button");
    this._btnTemplate.classList.add("cart-btn");
    this._btnTemplate.innerHTML = `
    <svg class="cart-btn-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>
    `;
    this._btnTemplate.addEventListener("click", this.showModal.bind(this));
  }

  // Вызывается при объявлении корзины, сразу рендерится
  getModalTemplate() {
    this._modalTemplate = document.createElement("div");
    this._modalTemplate.classList.add("cart-modal");
    this._modalTemplate.innerHTML = `
    <span class="cart-modal_empty">Your cart is empty. Add some goodies to be happier... OMNOMNOM!!!</span>
    <ul class="cart-modal-items_list"></ul>
    <span class="cart-modal-sum">${this._sum}</span>
    `;
    this.render(document.querySelector("header"), this._modalTemplate);
  }

  // Отображение модалки корзины. Просто добавляю display: block
  showModal() {
    this._modalTemplate.classList.toggle("show");
  }

  add(data) {
    console.log(this._itemsList);
    const duplicate = this._itemsList.filter((item) => item._id == data._id)[0];
    duplicate ? duplicate.plusOne(true): console.log("uniqe");

    return Promise.resolve(
      this._itemsList.push(new CartItem(data))
    ).then(() => {
      this._sum += data._price;
      this._modalTemplate.querySelector(
        ".cart-modal-sum"
      ).innerText = this._sum;
    });
  }

  render(root, child) { 
    return Promise.resolve(root.appendChild(child));
  }
}

class CartItem {
  constructor(data) {
    this._id = data._id;
    this._name = data._name;
    this._price = data._price;
    this._amount = 1;
    this._sum = data._price * this._amount;
    this._template;
    this.getTemplate();
    this.render(document.querySelector("ul"));
  }

  plusOne(param) {
    console.log('start');
    
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
    <span class="cart-item-amount">x${this._amount}</span>
    <span class="cart-item-sum">${this._sum}</span>
    `;
  }

  render(root) {
    return Promise.resolve(root.appendChild(this._template));
  }
}

let array = [
  { name: "Chocolate cookie", price: 4, img: "chocolate.jpg" },
  { name: "Gingerbread cookie", price: 3, img: "gingerbread.jpg" },
  { name: "Oat cookie", price: 2, img: "oat.jpg" },
];
const cookies = new ItemsList();
const productCart = new Cart();
