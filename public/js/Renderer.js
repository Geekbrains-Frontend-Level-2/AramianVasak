// export default HEADER = document.querySelector("header");
// export default MAIN = document.querySelector("main");

const HEADER = document.querySelector("header");
const MAIN = document.querySelector("main");

// export default
class Renderer {
  constructor(root) {
    this._root = root;
    this._child;
  }

  render() {
    this._root.appendChild(this._child);
  }
}
