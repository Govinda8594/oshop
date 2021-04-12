import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProductFilterComponent } from "app/products/product-filter/product-filter.component";
import { ProductsComponent } from "app/products/products.component";
import { AuthGuardService } from "shared/services/auth-guard.service";
import { SharedModule } from "shared/shared.module";

import { CheckOutComponent } from "./components/check-out/check-out.component";
import { MyOrderComponent } from "./components/my-order/my-order.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { ShippingFormComponent } from "./components/shipping-form/shipping-form.component";
import { ShoppingCartSummaryComponent } from "./components/shopping-cart-summary/shopping-cart-summary.component";
import { ShoppingCartsComponent } from "./components/shopping-carts/shopping-carts.component";

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartsComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    CheckOutComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: "products", component: ProductsComponent },
      { path: "shopping-cart", component: ShoppingCartsComponent },
      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "order-success/:id",
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "my/orders",
        component: MyOrderComponent,
        canActivate: [AuthGuardService],
      },
    ]),
  ],
})
export class ShoppingModule {}
