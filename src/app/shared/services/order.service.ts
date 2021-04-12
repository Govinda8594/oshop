import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ShoppingCartService } from "shared/services/shopping-cart.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}
  async storeOrder(order) {
    let result = await this.db.list("/orders").push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrder() {
    return this.db.list("/orders");
  }

  getOrderByUser(userId: string) {
    this.db.list("orders", (ref) => ref.orderByChild("userId").equalTo(userId));
  }
}
