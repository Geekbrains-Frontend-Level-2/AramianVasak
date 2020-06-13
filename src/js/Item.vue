<template>
  <div class="item">
    <div :class="['item-header']">
      <span :class="['item-title']">{{ this._data.name }}</span>
      <span class="item-price">{{ this._data.price }}</span>
    </div>
    <img :class="['item-img']" src="img/${this._data.img}" alt="${this._data.name} image" />
    <button :class="['item-btn']">ADD TO CART</button>`;
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "My title",
      price: 2
    };
  }
};
</script>

<style>
</style>