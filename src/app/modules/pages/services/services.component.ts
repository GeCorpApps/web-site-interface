import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/datasource/rest.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class PageServicesComponent implements OnInit {

  private method = "service";
  public list: any;

  constructor(private RService: RestService) { }

  ngOnInit(): void {
    this.getServiceData()
  }

  private getServiceData() {
      this.RService.get(this.method).subscribe(
        (resp) => {
          if (resp.status === true) {
            this.list = resp.result;
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
