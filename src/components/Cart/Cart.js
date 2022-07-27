import { findIndex } from "lodash";
import find from "lodash/find";

export default class Cart {
  items = [];

  getTotalCart() {
    return this.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
  }

  getItemQuantity(item) {
    const productIndex = this.getCartItemIndex(item);
    if (productIndex != undefined) {
      return this.items[productIndex].quantity;
    }
  }

  /**
   * If product doesn't exist in the cart array add it otherwise update the quantity
   * @param {Object} item - Product item
   *
   */
  add(item) {
    const productIndex = this.getCartItemIndex(item);

    // If productIndex is not undefined the product exist in the cart, so just increase quantity
    if (productIndex != undefined) {
      this.items[productIndex].quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  getCart() {
    return this.items;
  }

  /**
   *
   * @param {Object} item - Product Item
   * @returns true if cart array contains the product otherwise false
   */
  productExists(item) {
    let itemm = find(this.items, { product: item.product });
    return itemm;
  }

  /**
   *
   * @param {Object} item - Product item
   * @returns index of product item in cart array
   */
  getCartItemIndex(item) {
    if (this.productExists(item) != undefined) {
      return findIndex(this.items, {
        product: item.product,
      });
    }
    return undefined;
  }
}
