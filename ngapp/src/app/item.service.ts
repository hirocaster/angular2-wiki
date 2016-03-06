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

  updateItem (item: Item): Observable<Item>  {
    let body = JSON.stringify({ item });
    console.log(body);
    let headers = new Headers({
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": this.getCookie("XSRF-TOKEN")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.patch("api/items/" + item.id, body, options)
        .map(res =>  <Item> res.json())
        .catch(this.handleError);
  }

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }
}
