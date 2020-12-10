import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/datasource/rest.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class PageServiceComponent implements OnInit {

  private method = "service/";
  public service: any;

  constructor(private RService: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getServceData()
  }

  private getServceData() {
    this.route.data.subscribe((params) => {
      this.RService.get(this.method + params.id).subscribe(
        (resp) => {
          if (resp.status === true) {
            this.service = resp.result;
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
