import { Component, OnInit } from "angular2/core";
import { HTTP_PROVIDERS } from "angular2/http";
import { Router, RouteParams } from "angular2/router";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
  selector: "item",
  templateUrl: "./app/item.component.html",
  styleUrls: [],
  providers: [HTTP_PROVIDERS, ItemService],
})

export class ItemComponent implements OnInit {

  constructor(
    private _router: Router,
    private _itemService: ItemService,
    private _routeParams: RouteParams) {
  }

  item: Item;
  errorMessage: string;

  ngOnInit() {
    this.getItem();
  }

  getItem() {
    let id = +this._routeParams.get("id");
    this._itemService.getItem(id)
        .subscribe(
          item => this.item = item,
          error => this.errorMessage = <any>error);
  }

  gotoEdit() {
    this._router.navigate(["ItemEdit", { id: this.item.id }]);
  }
}
