import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/datasource/rest.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class PageServicesComponent implements OnInit {

  private dataFileUri = "assets/data/services.json";
  public list: any;

  constructor(private RService: RestService) { }

  ngOnInit(): void {
    this.getServiceData()
  }

  private getServiceData() {
    this.RService.get(this.dataFileUri).subscribe(
      (response) => {
        this.list = response;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}
