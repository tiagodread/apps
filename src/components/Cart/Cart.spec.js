import Cart from "./Cart";

describe("Cart", () => {
  let cart;
  let productBase;

  beforeEach(() => {
    cart = new Cart();
    productBase = {
      product: {
        name: "Macbook Pro",
        price: 12569,
      },
      quantity: 2,
    };
  });

  afterEach(() => {
    cart = undefined;
  });

  it("Should return 0 from getTotalCart when a new cart is created", () => {
    expect(cart.getTotalCart()).toEqual(0);
  });

  it("Should multiply the product price and quantity to obtain the total", () => {
    cart.add(productBase);
    expect(cart.getTotalCart()).toEqual(25138);
  });

  it("Should multiply the product price and quantity to obtain the total even for duplicated products", () => {
    cart.add(productBase);
    cart.add({
      product: {
        name: "Macbook Pro",
        price: 12569,
      },
      quantity: 1,
    });
    expect(cart.getTotalCart()).toEqual(37707);
    expect(cart.getItemQuantity(productBase)).toEqual(3);
  });

  it("Should ensure one product exists at a time", () => {
    cart.add(productBase);
    expect(cart.getItemQuantity(productBase)).toEqual(2);
    cart.add(productBase);
    expect(cart.getItemQuantity(productBase)).toEqual(4);
    expect(cart.getTotalCart()).toEqual(50276);
    expect(cart.getCart()).toEqual([productBase]);
  });
});
