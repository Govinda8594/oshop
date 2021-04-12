import { Component } from "@angular/core";

import { Router } from "@angular/router";
import { AuthService } from "shared/services/auth.service";
import { UserService } from "shared/services/user.service";

// import "bootstrap/dist/css/bootstrap.css";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    router: Router,
    private userService: UserService
  ) {
    auth.user$.subscribe((user) => {
      if (!user) return;

      userService.save(user);
      let returnUrl = localStorage.getItem("returnUrl");
      if (!returnUrl) return;
      localStorage.removeItem("returnUrl");
      router.navigateByUrl(returnUrl);
    });
  }
}