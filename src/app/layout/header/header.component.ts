import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RestService } from 'src/app/datasource/rest.service';
import * as $ from 'jquery';
import { WindowRef } from 'src/app/WindowRef';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  public manufacturers: any;
  public categories: any;
  public language: any;
  constructor(private RService: RestService, private winRef: WindowRef) { }

  ngOnInit() {
    // this.loadManufacturers();
    // this.loadCategories();
    // this.loadShoppingCard();
  }

  public loadManufacturers(){
    const cMethod = "product/manufacturer/0";
    this.RService.get(cMethod).subscribe(
      (resp) => {
        if (resp.status === true) {
          this.manufacturers = resp.result;
        } else {
          console.error(resp);
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  public loadCategories(){
    const cMethod = "product/category/list";
    this.RService.get(cMethod).subscribe(
      (resp) => {
        if (resp.status === true) {
          this.categories = resp.result;
        } else {
          console.error(resp);
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  private loadShoppingCard(){
    const cMethod = "product/get/shoppingcard";
    const cToken = this.RService.getToken();
    if(cToken.length == 140){
      this.RService.get(cMethod).subscribe(
        (resp) => {
          if (resp.status === true) {
            //this.shoppingcard = resp.result;
          //   let $countEl = $("#shopping_card_items_count");
          //   let $itemsEl = $("#shopping-card-items-block");
          //   $countEl.html(this.shoppingcard.count);
          //   const template = (title: any, src: any, price: any, discount: any, quantity: any) => `
          //     <p class="shopping-card">
          //       <img src="${src}" alt="${title}" style="width: 80px" /> ${title} <sup>${price} <s>${discount}</s></sup>
          //     </p>
          //   `;
          // $itemsEl.html('');
          // for (let index = 0; index < this.shoppingcard.result.length; index++) {
          //   let quantity = resp.result.items[index].quantity;
          //   let element = resp.result.items[index].product;     
          //   $itemsEl.append(template(element.title, element.product_images.first_image, element.product_price.price, element.product_price.discount, quantity));
          // }
          } else {
            console.error(resp);
          }
        },
        (error: any) => {
          console.log("HEADER shoppingcard request error: ", error);
        }
      );
    }
  }

  public filtering(){
    let $vKeyworkd = $("#search-engine-txt-box").val();
    console.log("HEADER Keyword: ", $vKeyworkd);
  }

  public setLanguage = (language) => {
    if (this.language === language) return;
    this.language = language;
    
    console.log('[LANGUAGE SWITCH TRIGGERED] setting language value to '+this.language);
    this.winRef.nativeWindow.document.locale=this.language;
}

}