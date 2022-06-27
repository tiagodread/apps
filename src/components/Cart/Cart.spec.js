import Cart from './Cart'

describe('Cart', () => {
    it('Should return 0 from getTotal when a new cart is created', () => {
        const cart = new Cart();
        expect(cart.getTotal()).toEqual(0)
    })

    it('Should multiply the product price and quantity to obtain the total', () => {
        const cart = new Cart();

        const item = {
            product:{
                name: 'Macbook Pro',
                price: 10000
            },
            quantity: 2
        }

        cart.add(item);
        expect(cart.getTotal()).toEqual(20000)
    })
})