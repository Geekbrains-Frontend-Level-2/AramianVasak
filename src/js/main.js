// import ItemsList from "./ItemsList";
// import Cart from "./Cart";
// import { HEADER } from "./Renderer";
// import CartBtn from "./CartBtn";

// const arr = new ItemsList();
// export const cart = new Cart(HEADER);
// const cartBtn = new CartBtn(HEADER, document.querySelector(".cart"));

import Vue from "vue";
import App from "./App.vue";
import "../style/style.scss";

new Vue({
  el: "main",
  template: "<App />",
  components: {
    App,
  },
});