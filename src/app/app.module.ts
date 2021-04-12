import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SharedModule } from "shared/shared.module";

import { environment } from "../environments/environment";
import { AdminModule } from "./admin/admin.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./core/components/login/login.component";
import { CoreModule } from "./core/core.module";
import { ProductsComponent } from "./products/products.component";
import { ShoppingModule } from "./shopping/shopping.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    ShoppingModule,
    CoreModule,
    AdminModule,

    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      { path: "", component: ProductsComponent },
      { path: "login", component: LoginComponent },
    ]),
  ],
  // exports: [AdminAuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
