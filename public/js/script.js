// test
let contentWrp = document.createElement('div');
contentWrp.className = 'content-wrp';
document.body.appendChild(contentWrp);

let contentWrpTitle = document.createElement('h1');
contentWrpTitle.className = 'content-wrp-title';
contentWrpTitle.innerText = 'Welcome to the cookie shop'
contentWrp.prepend(contentWrpTitle);

let contentNode = document.createElement('div');
contentNode.className = 'content';
contentWrp.appendChild(contentNode);

let cartNode = document.createElement('div');
cartNode.className = 'cart'

let cartTitle = document.createElement('h3');
cartTitle.className = 'cart-title'
cartTitle.innerText = 'Cart'

let emptyCart = document.createElement('span');
emptyCart.className = 'cart-empty';
emptyCart.innerText = 'Add some goodies to be happier... OMNOMNOM!!!';

cartNode.prepend(cartTitle);
cartNode.append(emptyCart);
contentWrp.append(cartNode);



class Product {
    constructor(name, price, id) {
        this.name = name;
        this.price = price;
        this.id = id;
    }

    // строит dom корзины
    buildCart(arr) {
        emptyCart.remove();

        // проверка на отсутствие такого продукта в корзине, при true создает новую строку
        if (document.getElementsByClassName(this.id + '-name').length < 1) {
            let cardProduct = document.createElement('div');
            let productName = document.createElement('span');
            let productAmount = document.createElement('span');
            let productPrice = document.createElement('span');

            cardProduct.classList.add(this.id + '-name', 'cart-item');
            productName.classList.add('cart-item-name');
            productAmount.classList.add(this.id + '-amount', 'cart-item-amount');
            productPrice.classList.add(this.id + '-price', 'cart-item-totalPrice');

            productName.innerText = this.name;
            productAmount.innerText = arr[0] + ' x ' + this.price + '$';
            productPrice.innerText = arr[1] + '$';

            cardProduct.appendChild(productName);
            cardProduct.appendChild(productAmount);
            cardProduct.appendChild(productPrice);
            cartTitle.after(cardProduct);

            // проверяю отсутствие общей цены, при true создаю, при false обновляю
            if (document.getElementsByClassName('cart-totalPrice').length < 1) {
                let productsTotalPrice = document.createElement('span');
                productsTotalPrice.className = 'cart-totalPrice';
                productsTotalPrice.innerText = 'Total price: ' + arr[2] + '$';
                cartNode.appendChild(productsTotalPrice);
            } else {
                let productsTotalPrice = document.getElementsByClassName('cart-totalPrice')[0];
                productsTotalPrice.innerText = 'Total price: ' + arr[2] + '$';
            }
        } else { /* при false обновляю кол-во и общую стоимость */
            let productAmount = document.getElementsByClassName(this.id + '-amount')[0];
            let productPrice = document.getElementsByClassName(this.id + '-price')[0];
            let productsTotalPrice = document.getElementsByClassName('cart-totalPrice')[0];

            productAmount.innerText = arr[0] + ' x ' + this.price + '$';
            productPrice.innerText = arr[1] + '$';

            productsTotalPrice.innerText = 'Total price: ' + arr[2] + '$';
        }
    }
}

let chocolate = new Product('Chocolate_cookie', '4', 'chocolate'),
    gingerbread = new Product('Gingerbread_cookie', '3', 'gingerbread'),
    oat = new Product('Oat_cookie', '2', 'oat'),
    cart = [];

// создаю карточку с продуктом
function createCard(object) {
    let productCard = document.createElement('div');
    productCard.classList.add('content-card', 'card');

    let productCardTitle = document.createElement('div');
    productCardTitle.className = 'content-card-title';

    let productName = document.createElement('span');
    productName.innerText = object.name;
    productCardTitle.appendChild(productName);

    let productPrice = document.createElement('span');
    productPrice.className = 'content-card-price'
    productPrice.innerText = object.price + "$";
    productCardTitle.appendChild(productPrice);

    let productImg = buildImgSrc(object);
    productImg.className = 'content-card-img'

    let buyButton = document.createElement('button');
    buyButton.innerText = 'BUY';
    buyButton.setAttribute('id', object.id);
    buyButton.addEventListener('click', addToCart);
    buyButton.className = 'content-card-btn'

    let arr = [productCardTitle, productImg, buyButton];

    for (i = 0; i < arr.length; i++) {
        productCard.appendChild(arr[i]);
    }

    contentNode.appendChild(productCard);
}

// путь к картинке для карточки
function buildImgSrc(object) {
    let imgSrc = 'img/' + object.name + '.png';
    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', imgSrc);
    return imgElement;
}

// добавляю продукт в массив корзины как объект
function addToCart() {
    let product = eval(this.getAttribute('id'));
    cart.push(product);
    let arr = calculate(product);
    product.buildCart(arr);
}

// вызывается при добавлении продукта в корзину
function calculate(product) {
    let amount = 0;
    let productPrice = 0;
    let allProductsPrice = 0;
    for (i = 0; i < cart.length; i++) {
        allProductsPrice += parseInt(cart[i].price);
        if (product == cart[i]) {
            amount++;
            productPrice += parseInt(cart[i].price);
        }
    }

    let arr = [amount, productPrice, allProductsPrice];
    return arr;
}

createCard(chocolate);
createCard(gingerbread);
createCard(oat);