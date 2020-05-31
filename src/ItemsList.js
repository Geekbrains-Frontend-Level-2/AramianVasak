import Item from "./Item";
import { MAIN } from "./Renderer";
import { cart } from "./index";

export default class ItemsList {
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
