import { ShoppingCart } from "./shopping-cart";

export class Order {
  datePlaced: number;
  items: any[];
  constructor(
    public userId: string,
    public shipping: any,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map((i) => {
      return {
        product: {
          title: i.product.title,
          price: i.product.price,
          imageUrl: i.product.imageUrl,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      };
    });
  }
}
