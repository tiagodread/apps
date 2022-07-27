import Cart from "./Cart";

describe("Cart", () => {
  let cart;
  let product;

  beforeEach(() => {
    cart = new Cart();
    product = {
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

  describe("Add and remove items", () => {
    it("Should return 0 from getTotalCart when a new cart is created", () => {
      expect(cart.getTotalCart().getAmount()).toEqual(0);
    });

    it("Should multiply the product price and quantity to obtain the total", () => {
      cart.add(product);
      expect(cart.getTotalCart().getAmount()).toEqual(25138.0);
    });

    it("Should multiply the product price and quantity to obtain the total even for duplicated products", () => {
      cart.add(product);
      cart.add({
        product: {
          name: "Macbook Pro",
          price: 12569,
        },
        quantity: 1,
      });
      expect(cart.getTotalCart().getAmount()).toEqual(37707);
      expect(cart.getItemQuantity(product)).toEqual(3);
    });

    it("Should ensure one product exists at a time", () => {
      cart.add(product);
      expect(cart.getItemQuantity(product)).toEqual(2);
      cart.add(product);
      expect(cart.getItemQuantity(product)).toEqual(4);
      expect(cart.getTotalCart().getAmount()).toEqual(50276);
      expect(cart.getCart()).toEqual([product]);
    });

    it("Should add an item, remove it and the total be updated", () => {
      const product2 = {
        product: {
          name: "Iphone 13 Pro",
          price: 6599,
        },
        quantity: 1,
      };
      cart.add(product);
      cart.add(product2);
      expect(cart.getItemQuantity(product)).toEqual(2);
      expect(cart.getItemQuantity(product2)).toEqual(1);
      expect(cart.getCart()).toEqual([product, product2]);
      expect(cart.getTotalCart().getAmount()).toEqual(31737);
      cart.remove(product2);
      expect(cart.getItemQuantity(product2)).toEqual(0);
      expect(cart.getTotalCart().getAmount()).toEqual(25138);
    });
  });

  describe("Checkout", () => {
    it("Should return an object with items and total", () => {
      cart.add(product);
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
          price: 5022,
        },
        quantity: 5,
      });
      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotalCart().getAmount()).toEqual(63446);
      expect(cart.checkout()).toMatchSnapshot();
      expect(cart.getTotalCart().getAmount()).toEqual(0);
    });
  });

  describe("Special discounts", () => {
    it("Should apply 20% discount correctly", () => {
      const condition = {
        percentage: 20,
        minimum: 2,
      };

      product.condition = condition;
      cart.add(product);
      expect(cart.getTotalCart().getAmount()).toEqual(20110);
    });

    it("Should apply 50% discount correctly", () => {
      const condition = {
        percentage: 50,
        minimum: 3,
      };

      product.quantity = 5;
      product.condition = condition;
      cart.add(product);
      expect(cart.getTotalCart().getAmount()).toEqual(31423);
    });

    it("Should apply 80% discount correctly", () => {
      const condition = {
        percentage: 80,
        minimum: 10,
      };

      product.quantity = 10;
      product.condition = condition;
      cart.add(product);
      expect(cart.getTotalCart().getAmount()).toEqual(25138);
    });
  });
});
