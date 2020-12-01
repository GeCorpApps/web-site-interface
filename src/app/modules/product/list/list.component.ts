import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/datasource/rest.service';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ProductListComponent implements OnInit {
  public list = null;
  public lang: String;
  private method = "product/bycriteria";
  public selectedMenuItem = 2;
  public selectedMenuItemClass = "current-menu-item";
  public title = 'ახალი და მეორადი ავტონაწილების მაღაზია VGParts';

  constructor(private RService: RestService, private route: ActivatedRoute, private titleService: Title, private metaTagService: Meta) {
  }

  ngOnInit(): void {
    $("#records_not_found").hide();
    this.titleService.setTitle(this.title);
    this.metaTagService.addTags([
      {name: 'keywords', content: 'ავტონაწილები,ავტო,დაშლილები,მეორადი ნაწილები,მეორადი ავტონაწილები'},
      {name: 'description', content: 'ახალი და მეორადი ავტონაწილების მაღაზია VGParts გთავაზობთ მაღალი ხარისხის მომსახურებას, მიიღეთ რაციონალური გადაწყვეტილება'},
      {name: 'robots', content: 'index, follow'}
    ]);

    this.lang = localStorage.getItem("lang");
    this.route.params.subscribe((params) => {
      var $manufacturer_id = "0";
      var $category_id = "0";
      if(params.category_id){
        $category_id = params.category_id;
      }
      if(params.manufacturer_id){
        $manufacturer_id = params.manufacturer_id;
      }

      this.RService.get(this.method + '/' + $category_id + '/' + $manufacturer_id).subscribe(
        (resp) => {
          if (resp.status === true) {
            this.list = resp.result;
            if(this.list.length == 0) {
              $("#records_not_found").show("slow");
            }else{
              $("#records_not_found").hide("slow");
            }
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

  public addToWishlist($productId){
    const cMethod = "/api/product/add/to/wishlist/" + $productId;
    let vParams = new FormData();
    this.RService.post(cMethod, vParams).subscribe(function(response){
      if(response.status == true){
        alert(response.result);
      }
    });
  }

  public addToShoppingCard($pProductId: Number) {
    let method = 'product/add/to/shoppingcard';
    let vParams = new FormData();
    let vQuantity = $("input[name='quantity']");
    vParams.append('product_id', $pProductId.toString());
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

}
