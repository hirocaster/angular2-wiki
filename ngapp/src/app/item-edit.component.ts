import { Component, OnInit } from "angular2/core";
import { HTTP_PROVIDERS } from "angular2/http";
import { Router, RouteParams } from "angular2/router";

import { Item } from "./item";
import { ItemComponent } from "./item.component";
import { ItemService } from "./item.service";

@Component({
  selector: "item-edit",
  templateUrl: "./app/item-edit.component.html",
  styleUrls: ["app/item-edit.component.css"],
  providers: [HTTP_PROVIDERS, ItemService],
  inputs: ["item"]
})

export class ItemEditComponent {

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

  updateItem (item: Item) {
    if (!item) { return; }
    this._itemService.updateItem(item)
        .subscribe(
          item  => this.gotoItem(item),
          error => this.errorMessage = <any>error);
  }

  updatePreview (item: Item) {
    if (!item) { return; }
    this._itemService.updatePreview(item)
        .subscribe(
          item  => this.item.rendered_body = <string>item.rendered_body,
          error => this.errorMessage = <any>error);
  }

  gotoItem(item: Item) {
    this._router.navigate(["Item", { id: item.id }]);
  }
}
