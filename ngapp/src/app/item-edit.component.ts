import { Component, OnInit } from "angular2/core";
import { HTTP_PROVIDERS } from "angular2/http";
import { RouteParams } from "angular2/router";

import { Item } from "./item";
import { ItemComponent } from "./item.component";
import { ItemService } from "./item.service";

@Component({
  selector: "item-edit",
  templateUrl: "./app/item-edit.component.html",
  styleUrls: [],
  providers: [HTTP_PROVIDERS, ItemService],
  inputs: ["item"]
})

export class ItemEditComponent {

  constructor(
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
}
