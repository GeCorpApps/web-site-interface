import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/datasource/rest.service';
import { iPage } from './iPage';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PagePageComponent implements OnInit {

  private method = "page/";
  public page: iPage = {
    title: "",
    content: "",
    meta_description: "",
    meta_keywords: "",
    meta_title: ""  
  };

  constructor(private RService: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPageData()
  }

  private getPageData() {
    this.route.data.subscribe((params) => {
      this.RService.get(this.method + params.id).subscribe(
        (resp) => {
          if (resp.status === true) {
            this.page = resp.result;
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
