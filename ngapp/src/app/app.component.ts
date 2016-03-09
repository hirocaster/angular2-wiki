import { Component } from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";
import { ItemsComponent } from "./items.component";
import { ItemComponent } from "./item.component";
import { ItemEditComponent } from "./item-edit.component";

@Component({
  selector: "my-app",
  template: `
<ul>
  <li><a [routerLink]="['Items']">Item List</a></li>
  <li><a [routerLink]="['ItemNew']">New Item</a></li>
</ul>
<router-outlet></router-outlet>`,
  styleUrls: [],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
  {
    path: "/items/new",
    name: "ItemNew",
    component: ItemEditComponent
  },
  {
    path: "/items/:id/edit",
    name: "ItemEdit",
    component: ItemEditComponent
  },
  {
    path: "/items",
    name: "Items",
    component: ItemsComponent,
    useAsDefault: true
  },
  {
    path: "/items/:id",
    name: "Item",
    component: ItemComponent
  }
])

export class AppComponent {
}
