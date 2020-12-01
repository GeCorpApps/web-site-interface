import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {

  pages = [];

  constructor() { }

  ngOnInit() {
    this.pages = [
      {id: 1, seq_id: 1, lang_id: 1, title: 'ჩვენს შესაებ', content: '<h1>ტექსტი</h1>'}
    ];
  }

}
