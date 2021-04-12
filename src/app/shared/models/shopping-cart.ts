import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(private itemMap: ShoppingCartItem[]) {
    for (let productId in itemMap) {
      let item = itemMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }
  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }
  get totalPrice() {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.totalPrice;
    });

    return sum;
  }

  getQuantity(product: Product) {
    if (!this.itemMap) return 0;
    let item = this.itemMap[product.key];
    return item ? item.quantity : 0;
  }
}
