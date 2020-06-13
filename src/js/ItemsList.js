import Item from "./Item";
import { MAIN } from "./Renderer";
import { cart } from "./main";

export default class ItemsList {
  #arr = []
  
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
