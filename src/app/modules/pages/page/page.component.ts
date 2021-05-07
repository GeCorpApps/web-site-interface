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

  private dataFileUri = "assets/data/services.json";
  public page: iPage = {
    id: 0,
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
      var vID = params.id;
      this.RService.get(this.dataFileUri).subscribe(
        (resp:any) => {
            this.page = resp.pages.filter((data) => {
              if(data.id == vID){
                return data;
              }
            });
        },
        (error: any) => {
          console.log(error);
        }
      )
    })
  }

}
