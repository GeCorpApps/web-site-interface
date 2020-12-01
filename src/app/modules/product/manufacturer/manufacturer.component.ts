import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/datasource/rest.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ProductManufacturerComponent implements OnInit {
  public manufacturers: [];
  constructor(private RService: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    $("#records_not_found").hide();
    this.route.params.subscribe((params) => {
      this.loadManufacturers(params.manufacturer_id);
    });
  }

  public loadManufacturers($pId){
    const cMethod = "product/manufacturer/" + $pId;
    this.RService.get(cMethod).subscribe(
      (resp) => {
        if (resp.status === true) {
          this.manufacturers = resp.result;
          if(this.manufacturers.length == 0) {
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
  }

}
