import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/datasource/rest.service';
import { iPage } from '../page/iPage';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class PageContactComponent implements OnInit {

  private dataFileUri = "assets/data/services.json";
  private pageId = 2;
  public page: iPage = {
    id: 0,
    title: "",
    content: "",
    meta_description: "",
    meta_keywords: "",
    meta_title: ""  
  };

  constructor(private RService: RestService) { }

  ngOnInit(): void {
    this.getPageData()
  }

  private getPageData() {
      this.RService.get(this.dataFileUri).subscribe(
        (resp:any) => {
            this.page = resp.pages.filter((data) => {
              if(data.id == this.pageId){
                return data;
              }
            });
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

}
