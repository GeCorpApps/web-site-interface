import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/datasource/rest.service';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss']
})
export class ListingManufacturersComponent implements OnInit {
  private manufacturer_id: any;
  private method = "product/manufacturer/";
  public manufacturer: any;
  public parent_record: {
      id: 0,
      name: "",
      photo: "/uploads/manufacturers/logo/svg/bmw.svg"
  };
  
  constructor(private router : Router, private RService: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.manufacturer_id = params.manufacturer_id;
      this.RService.get(this.method + params.manufacturer_id).subscribe(
        (resp) => {
          if (resp.status === true) {
            this.manufacturer = resp.result;
            this.parent_record = resp.parent_record;
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

}
