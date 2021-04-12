import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { Observable } from "rxjs";
import { ShoppingCart } from "shared/models/shopping-cart";

@Component({
  selector: "app-shopping-carts",
  templateUrl: "./shopping-carts.component.html",
  styleUrls: ["./shopping-carts.component.css"],
})
export class ShoppingCartsComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    // console.log(
    //   this.cart$.subscribe((c) => c.items.forEach((x) => console.log(x)))
    // );
  }
  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
