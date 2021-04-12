import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { OrderService } from "shared/services/order.service";
import { switchMap } from "rxjs/operators";
import { pipe } from "rxjs";

@Component({
  selector: "app-my-order",
  templateUrl: "./my-order.component.html",
  styleUrls: ["./my-order.component.css"],
})
export class MyOrderComponent implements OnInit {
  order$;
  constructor(
    private authService: AngularFireAuth,
    private orderService: OrderService
  ) {
    this.order$ = authService.user.pipe(
      switchMap(async (u) => orderService.getOrderByUser(u.uid))
    );
  }
  ngOnInit() {}
}
