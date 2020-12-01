import { Component, OnInit, ViewChildren } from '@angular/core';
import { RestService } from 'src/app/datasource/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { Title, Meta } from '@angular/platform-browser';
import { IProduct } from './product.interface';
//import { CMetaTags } from 'src/app/datasource/classes/cmeta-tags';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ProductItemComponent implements OnInit {

  private method = "product";
  public product: any;
  public href: string = "";
  public lang: String;

  constructor(private router : Router, private RService: RestService, private route: ActivatedRoute/*, private vCMetaTags: CMetaTags*/) { }

  ngOnInit(): void {
    //$(".verticalmenu-content").css("display","none");
    this.route.params.subscribe((params) => {
      this.RService.get(this.method + '/' + params.id).subscribe(
        (resp) => {
          if (resp.status === true) {
            this.product = resp.result;
          } else {
            console.error(resp);
          }
        },
        (error: any) => {
          console.log(error);
        }
      )
    })
  }

  ngOnChanges() { }

  ngAfterViewInit() { }

  private updateShoppingCard($pCount: any, $pItems: any){
    let $countEl = $("#shopping_card_items_count");
    let $itemsEl = $("#shopping-card-items-block");
    $countEl.html($pCount);
    $itemsEl.html('');
    for (let index = 0; index < $pItems.length; index++) {
      let element = $pItems[index];
      let template = (title) => `
        <p>${title}</p>
      `;
      $itemsEl.append(template(element.title));
      $itemsEl.append(element.product_price.price);
    }
  }

  public addToShoppingCard() {
    let method = 'product/add/to/shoppingcard';
    let vParams = new FormData();
    let vQuantity = $("input[name='quantity']");
    vParams.append('product_id', this.product.id.toString());
    vParams.append('quantity', vQuantity.val());
    //$(".single_add_to_cart_button").prop("disabled", true);
    vQuantity.val("1");
    this.RService.post(method, vParams).subscribe(function(response){
      if(response.status == true){
        //this.updateShoppingCard(response.result.count, response.result.items);
        let $countEl = $("#shopping_card_items_count");
        let $itemsEl = $("#shopping-card-items-block");
        $countEl.html(response.result.count);
        const template = (title: any, src: any, price: any, discount: any, quantity: any) => `
            <p class="shopping-card">
              <img src="${src}" alt="${title}" style="width: 80px" /> ${title} <sup>${price} <s>${discount}</s></sup>
            </p>
          `;
        $itemsEl.html('');
        for (let index = 0; index < response.result.items.length; index++) {
          let quantity = response.result.items[index].quantity;
          let element = response.result.items[index].product;
          $itemsEl.append(template(element.title, element.product.product_images.first_image, element.product_price.price, element.product_price.discount, quantity));
        }
        // Swal.fire({
        //   title: 'ტრანზაქციამ ჩაიარა წარმატებით',
        //   text: this.product.title + ' დაემატა კალათაში',
        //   icon: 'success'
        // })
      }else{
        Swal.fire({
          title: 'ტრანზაქციამ ვერ შესრულდა',
          text: response.result,
          icon: 'error'
        })
      }
    });
  }

  public thumbImagesClick($pFileName: string){
    $("#main-photo").attr("src", $pFileName);
  }
}
