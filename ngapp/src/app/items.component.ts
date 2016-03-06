import { Component, OnInit } from "angular2/core";
import { HTTP_PROVIDERS } from "angular2/http";
import { Router, RouteParams } from "angular2/router";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
  selector: "items",
  templateUrl: "app/items.component.html",
  styleUrls: ["app/items.component.css"],
  providers: [HTTP_PROVIDERS, ItemService],
})

export class ItemsComponent implements OnInit {

  constructor(
    private _router: Router,
    private _itemService: ItemService,
    private _routeParams: RouteParams) {
  }

  items: Item[];
  errorMessage: string;

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this._itemService.getItems()
        .subscribe(
          items => this.items = items,
          error => this.errorMessage = <any>error);
  }

  gotoItem(item: Item) {
    this._router.navigate(["Item", { id: item.id }]);
  }
}
