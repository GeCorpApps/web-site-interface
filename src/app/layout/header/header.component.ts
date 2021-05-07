import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/datasource/rest.service';
import * as $ from 'jquery';
import { WindowRef } from 'src/app/WindowRef';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  public language: any;
  constructor(private winRef: WindowRef, private router: Router) { }

  ngOnInit() {
    $("ul#navigation_ul li a").click(function(){
      let $thisLi = $(this).parent("li");
      $("ul#navigation_ul li").removeClass("current");
      $thisLi.addClass("current");
    });
  }

  public filtering(){
    let $vKeyworkd = $("#search-engine-txt-box").val();
    console.log("HEADER Keyword: ", $vKeyworkd);
  }

  public setLanguage = (language) => {
      this.language = language;
      this.winRef.nativeWindow.document.locale=this.language;
      let fragment = this.router.url;
      window.location.href = "/" + this.language + "/#" + fragment;
  }

}
