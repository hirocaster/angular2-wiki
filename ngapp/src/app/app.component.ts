import { Component, OnInit } from "angular2/core";
import { Router } from "angular2/router";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";
import { ItemComponent } from "./item.component";
import { ItemEditComponent } from "./item-edit.component";

@Component({
  selector: "my-app",
  template: `
<button (click)="gotoItem()">View first item</button>
<router-outlet></router-outlet>`,
  styleUrls: [],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
  {
    path: "/items/:id/edit",
    name: "ItemEdit",
    component: ItemEditComponent
  },
  {
    path: "/items/:id",
    name: "Item",
    component: ItemComponent
  }
])

export class AppComponent implements OnInit {

  constructor(
    private _router: Router) {
  }

  ngOnInit() {
    // this.gotoItem();
  }

  gotoItem() {
    this._router.navigate(["Item", { id: 1 }]);
  }
}
