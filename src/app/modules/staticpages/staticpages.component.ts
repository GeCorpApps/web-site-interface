import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RestService } from 'src/app/datasource/rest.service';
import { ActivatedRoute } from '@angular/router';
import { iPage } from './iPage';

@Component({
  selector: 'app-staticpages',
  templateUrl: './staticpages.component.html',
  styleUrls: ['./staticpages.component.scss']
})

export class StaticpagesComponent implements OnInit {
  private method = "page/";
  public page: iPage = {
    title: "",
    content: "",
    meta_description: "",
    meta_keywords: "",
    meta_title: ""  
  };

  constructor(private RService: RestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
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