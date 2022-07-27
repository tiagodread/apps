import Cart from "./Cart";

describe("Cart", () => {
  let cart;
  let productBase;

  beforeEach(() => {
    cart = new Cart();
    productBase = {
      product: {
        name: "Macbook Pro",
        price: 12569.0,
      },
      quantity: 2,
    };
  });

  afterEach(() => {
    cart = undefined;
  });

  describe("Add and remove items", () => {
    it("Should return 0 from getTotalCart when a new cart is created", () => {
      expect(cart.getTotalCart().getAmount()).toEqual(0);
    });

    it("Should multiply the product price and quantity to obtain the total", () => {
      cart.add(productBase);
      expect(cart.getTotalCart().getAmount()).toEqual(25138.0);
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
      expect(cart.getTotalCart().getAmount()).toEqual(37707);
      expect(cart.getItemQuantity(productBase)).toEqual(3);
    });

    it("Should ensure one product exists at a time", () => {
      cart.add(productBase);
      expect(cart.getItemQuantity(productBase)).toEqual(2);
      cart.add(productBase);
      expect(cart.getItemQuantity(productBase)).toEqual(4);
      expect(cart.getTotalCart().getAmount()).toEqual(50276);
      expect(cart.getCart()).toEqual([productBase]);
    });

    it("Should add an item, remove it and the total be updated", () => {
      const product2 = {
        product: {
          name: "Iphone 13 Pro",
          price: 6599,
        },
        quantity: 1,
      };
      cart.add(productBase);
      cart.add(product2);
      expect(cart.getItemQuantity(productBase)).toEqual(2);
      expect(cart.getItemQuantity(product2)).toEqual(1);
      expect(cart.getCart()).toEqual([productBase, product2]);
      expect(cart.getTotalCart().getAmount()).toEqual(31737);
      cart.remove(product2);
      expect(cart.getItemQuantity(product2)).toEqual(0);
      expect(cart.getTotalCart().getAmount()).toEqual(25138);
    });
  });

  describe("Checkout", () => {
    it("Should return an object with items and total", () => {
      cart.add(productBase);
      cart.add({
        product: {
          name: "Iphone 13 Pro",
          price: 6599,
        },
        quantity: 2,
      });
      cart.add({
        product: {
          name: "Apple Watch Series 7",
          price: 5022.0,
        },
        quantity: 5,
      });
      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotalCart().getAmount()).toEqual(63446);
      expect(cart.checkout()).toMatchSnapshot();
      expect(cart.getTotalCart().getAmount()).toEqual(0);
    });
  });
});
