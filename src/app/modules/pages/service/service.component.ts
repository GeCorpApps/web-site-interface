import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Config } from 'src/app/datasource/config';
import { RestService } from 'src/app/datasource/rest.service';

interface MetaData {
  title: string,
  keywords: string,
  description: string
};

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})

export class PageServiceComponent implements OnInit {

  public service = {
      id: 0,
      name: "",
      description: "",
      photo: "",
      page: {
          name: "",
          content: ""            
      }
  };
  
  private service_id: number;
  private dataFileUri = "assets/data/services.json";

  constructor(private cnfg: Config, private RService: RestService, private route: ActivatedRoute, private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.getServceData()
  }

  private getServceData() {
    this.route.params.subscribe((params) => {
      this.service_id = params.id;
      this.RService.get(this.dataFileUri).subscribe(
        (resp) => {
          let serv = resp.filter((item) =>{
             if(item.id == this.service_id){
              return item;
             }
          })[0];
          this.service.id = serv.id;
          this.service.name = serv.name;
          this.service.description = serv.description;
          this.service.photo = serv.photo;
          this.service.page.name = serv.page.name;
          this.service.page.content = serv.page.content;
          
          let lMeta: MetaData;
          lMeta.title = this.service.name;
          lMeta.keywords = this.service.name;
          lMeta.description = this.service.description;
          this.setMetaData(lMeta);
        },
        (error: any) => {
          console.log(error);
        }
      )
    })
  }

  private setMetaData(pMetaData: MetaData){
    this.titleService.setTitle(pMetaData.title);
    this.metaService.addTags([
      {name: 'keywords', content: pMetaData.keywords},
      {name: 'description', content: pMetaData.description},
      {name: 'robots', content: this.cnfg.meta.robots},
      {name: 'theme-color', content: this.cnfg.meta.themeColor},
      {name: 'msapplication-TileColor', content: this.cnfg.meta.msapplicationTileColor}
    ]); 
  }

}
