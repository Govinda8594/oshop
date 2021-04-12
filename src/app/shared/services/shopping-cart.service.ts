import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { take, map } from "rxjs/operators";
import { Product } from "shared/models/product";
import { Observable } from "rxjs";
import { ShoppingCart } from "shared/models/shopping-cart";
import { ShoppingCartItem } from "shared/models/shopping-cart-item";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}
  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime(),
    });
  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();

    return this.db
      .object("/shopping-carts/" + cartId)
      .valueChanges()
      .pipe(
        map((cart: ShoppingCart) => {
          if (cart !== null) return new ShoppingCart(cart.items);
          // return new ShoppingCartItem([]);
        })
      );
  }
  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }
  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }
  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId).remove();
  }
  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item) => {
        item$.update({
          product: product,
          quantity: item.payload.exists()
            ? (item.payload.exportVal().quantity as number) + change
            : 1,
        });
      });
  }
}
