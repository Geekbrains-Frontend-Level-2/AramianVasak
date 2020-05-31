export const HEADER = document.querySelector("header");
export const MAIN = document.querySelector("main");

export default class Renderer {
  constructor(root) {
    this._root = root;
    this._child;
  }

  render() {
    this._root.appendChild(this._child);
  }
}
