import { Injectable } from "angular2/core";

import { Http, Response } from "angular2/http";
import { Headers, RequestOptions } from "angular2/http";

import { Item } from "./item";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ItemService {

  constructor (private http: Http) {}

  getItems() {
    return this.http.get("api/items/")
        .map(res => <Item[]> res.json())
        .do(data => console.log(data))
          .catch(this.handleError);
  }

  getItem(id: number) {
    return this.http.get("api/items/" + id)
        .map(res => <Item> res.json())
        .do(data => console.log(data))
          .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }
}
