!function(t){var e={};function i(s){if(e[s])return e[s].exports;var c=e[s]={i:s,l:!1,exports:{}};return t[s].call(c.exports,c,c.exports,i),c.l=!0,c.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var c in t)i.d(s,c,function(e){return t[e]}.bind(null,c));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e),i.d(e,"cart",(function(){return h}));const s=document.querySelector("header"),c=document.querySelector("main");class r{constructor(t){this._root=t,this._child}render(){this._root.appendChild(this._child)}}class a extends r{constructor(t,e,i){super(t),this._data=e,this._cart=i,this.getTemplate()}addToCart(){this._cart.add(this._data)}getTemplate(){this._child=document.createElement("div"),this._child.classList.add("item"),this._child.innerHTML=`\n      <div class="item-header">\n      <span class="item-title">${this._data.name}</span>\n      <span class="item-price">${this._data.price}$</span>\n      </div>\n      <img  class="item-img" src="img/${this._data.img}" alt="${this._data.name} image"/>\n      <button class="item-btn">ADD TO CART</button>`,this._child.querySelector(".item-btn").addEventListener("click",this.addToCart.bind(this)),this.render()}}class n extends r{constructor(t,e,i){super(i),this._data=t,this._cart=e,this._amount=1,this._totalPrice=t.price,this.getTemplate(),this.render(),this.incSum()}incSum(){this._cart.incCartSum(this._data)}decSum(){this._cart.decCartSum(this._data)}inc(){this.incSum(),this._amount++,this._totalPrice=this._amount*this._data.price,this._child.querySelector(".cart-item-amount").innerText="x"+this._amount,this._child.querySelector(".cart-item-sum").innerText=this._totalPrice+"$"}dec(){1==this._amount?this.remove():(this.decSum(),this._amount--,this._totalPrice=this._amount*this._data.price,this._child.querySelector(".cart-item-amount").innerText="x"+this._amount,this._child.querySelector(".cart-item-sum").innerText=this._totalPrice+"$")}remove(){let t;this._cart._items.forEach((e,i)=>{e._data.id==this._data.id&&(t=i)}),this._cart._items.splice(t,1),this._child.remove(),this._cart._sum-=this._totalPrice,this._cart._child.querySelector(".cart-sum").innerText=this._cart._sum+"$",this._cart.ifEmptyCart()}getTemplate(){this._child=document.createElement("li"),this._child.classList.add("cart-item"),this._child.setAttribute("id",this._data.id),this._child.innerHTML=`\n      <span class="cart-item-name">${this._data.name}</span>\n      <span class="item-price">${this._data.price}$</span>\n      <button class="cart-item-dec">-</button>\n      <span class="cart-item-amount">x${this._amount}</span>\n      <button class="cart-item-inc">+</button>\n      <span class="cart-item-sum">${this._totalPrice}$</span>\n      <button class="cart-item-remove">DELETE</button>\n      `,this._child.querySelector(".cart-item-dec").addEventListener("click",this.dec.bind(this)),this._child.querySelector(".cart-item-inc").addEventListener("click",this.inc.bind(this)),this._child.querySelector(".cart-item-remove").addEventListener("click",this.remove.bind(this))}}new class{constructor(){this._arr=[],this.fetchData()}fetchData(){fetch("./data/items.json").then(t=>t.json()).then(t=>{this._arr=t.items.map(t=>new a(c,t,h))})}};const h=new class extends r{constructor(t){super(t),this._items=[],this._sum=0,this.getTemplate()}ifEmptyCart(){const t=this._child.querySelector(".cart-sum-wrp"),e=this._child.querySelector(".cart_empty");0==this._sum?(t.classList.remove("show"),e.classList.add("show")):(t.classList.add("show"),e.classList.remove("show"))}add(t){const e=this._items.filter(e=>e._data.id===t.id);if(!e[0])return Promise.resolve(this._items.push(new n(t,this,this._child.querySelector(".cart-items"))));e[0].inc()}incCartSum(t){const e=this._child.querySelector(".cart-sum");this._sum+=t.price,e.innerText=this._sum+"$",this.ifEmptyCart()}decCartSum(t){const e=this._child.querySelector(".cart-sum");this._sum-=t.price,e.innerText=this._sum+"$",this.ifEmptyCart()}removeAll(){this._items.forEach(t=>t._child.remove()),this._items.splice(0,this._items.length),this._sum=0,this.ifEmptyCart()}getTemplate(){this._child=document.createElement("div"),this._child.classList.add("cart"),this._child.innerHTML=`\n      <span class="cart_empty show">Your cart is empty. Add some goodies to be happier... OMNOMNOM!!!</span>\n      <ul class="cart-items"></ul>\n      <div class="cart-sum-wrp">\n      <span class="cart-sum">${this._sum}$</span>\n      <button class="cart-clean">DELETE ALL</button>\n      </div>`,this._child.querySelector(".cart-clean").addEventListener("click",this.removeAll.bind(this)),this.render()}}(s);new class extends r{constructor(t,e){super(t),this._cart=e,this.getTemplate()}displayCart(){this._cart.classList.toggle("show")}getTemplate(){this._child=document.createElement("button"),this._child.classList.add("cart-btn"),this._child.innerHTML='\n      <svg class="cart-btn-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">\n      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 \n      2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 \n      0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 \n      16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>',this._child.addEventListener("click",this.displayCart.bind(this)),this.render(this._root)}}(s,document.querySelector(".cart"))}]);