import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "shared/services/product.service";
import { Product } from "shared/models/product";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { ShoppingCart } from "shared/models/shopping-cart";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;
  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProduct();
  }
  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((p) => p.category === this.category)
      : this.products;
  }
  private populateProduct() {
    this.productService
      .getAll()
      .pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )

      .subscribe((params) => {
        this.category = params.get("category");
        this.applyFilter();
      });
  }
}
