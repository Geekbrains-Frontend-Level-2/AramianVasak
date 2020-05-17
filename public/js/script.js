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
    this.name = name;
    this.price = price;
    this.img = img;
    this._template;
    this.getTemplate();
    render(this._template, main);
  }

  addToCart() {
    console.log("kek");
  }

  getTemplate() {
    this._template = document.createElement("div");
    this._template.classList.add("item");
    this._template.innerHTML = `
    <span class="item-title">${this.name}</span>
    <span class="item-price">${this.price}$</span>
    <img  class="item-img" src="img/${this.img}" alt="${this.name} image"/>
    <button class="item-btn">ADD TO CART</button>
    `;

    this._template
      .querySelector("button")
      .addEventListener("click", this.addToCart.bind(this));
  }
}

class ItemsList {
  /**
   *Creates an list of items from array.
   * @param {array} arr Array of items objects.
   */
  constructor(arr) {
    this.arr = arr;
    this.getArr();
  }

  getArr() {
    this.arr.map((item) => {
      return new Item(item.name, item.price, item.img);
    });
  }
}

let array = [
  {name: "Chocolate cookie", price: 4, img: "123.png"},
  {name: "Gingerbread cookie", price: 3, img: "gingerbread.png"},
  {name: "Oat cookie", price: 2, img: "oat.jpg"},
]

const cookies = new ItemsList(array)
