import { Component, OnInit, OnDestroy, Output, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "shared/models/product";
import { ProductService } from "shared/services/product.service";
// import { DataTableResource } from "angular-4-data-table";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"],
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProduct: Product[];
  subscription: Subscription;
  // tableResources: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  @Input("sortByInput") public sortByInput: string | string[] = "";
  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe((products: Product[]) => {
      this.filteredProduct = this.products = products;
      console.log(this.filteredProduct);

      // this.initializetable(products);
    });
  }
  // private initializetable(products: Product[]) {
  //   this.tableResources = new DataTableResource(products);
  //   this.tableResources
  //     .query({ offset: 0 })
  //     .then((items) => (this.items = items));
  //   this.tableResources.count().then((count) => (this.itemCount = count));
  // }
  // reloadItem(params) {
  //   if (!this.tableResources) return;
  //   this.tableResources.query(params).then((items) => (this.items = items));
  // }
  filter(query: string) {
    debugger;
    this.filteredProduct = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
  ngOnInit() {}
}
