import { findIndex } from "lodash";
import find from "lodash/find";
import { remove } from "lodash";
import Dinero from "dinero.js";

const Money = Dinero;
Money.defaultCurrency = "BRL";
Money.defaultPrecision = 2;

export default class Cart {
  items = [];

  getTotalCart() {
    return this.items.reduce((acc, item) => {
      console.log(item);
      console.log(item.quantity);
      const amount = Money({ amount: item.quantity * item.product.price });
      let discount = Money({ amount: 0 });

      if (
        item.condition &&
        item.condition.percentage &&
        item.quantity >= item.condition.minimum
      ) {
        discount = amount.percentage(item.condition.percentage);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  getItemQuantity(item) {
    const productIndex = this.getCartItemIndex(item);
    if (productIndex != undefined) {
      return this.items[productIndex].quantity;
    }
    return 0;
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

  remove(item) {
    const productIndex = this.getCartItemIndex(item);
    if (productIndex != undefined) {
      remove(this.items, { product: item.product });
    }
  }

  summary() {
    const items = this.items;
    const total = this.getTotalCart().getAmount();

    return {
      items,
      total,
    };
  }

  checkout() {
    const { items, total } = this.summary();

    this.items = [];

    return {
      items: items,
      total: total,
    };
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
