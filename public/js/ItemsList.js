// import Item from "./Item";
// import cart from "./index";
// import MAIN from "./Renderer";

// export default 
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
