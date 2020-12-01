import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/datasource/services/loader/loader.service';


@Component({
  selector: 'app-loading',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public text: any;
  loading: boolean;
  filename: String;
  private min = 1;
  private max = 17;
  constructor(private loaderService: LoaderService) {
    this.getPreloaderPhrases(); // changePreloaderFileName
    setInterval(() => {
      this.getPreloaderPhrases(); //changePreloaderFileName
    }, 10000);    
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }
  ngOnInit() {
  }

  private calculateRand(){
    this.max = Array(localStorage.getItem("preloader")).length - 1;
    let rand = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    return rand;
  }

  private changePreloaderFileName() {
    let rand = this.calculateRand();
    this.filename = '/app/assets/theme/images/preloader/' + rand + '.gif';
    return true;
  }

  private getPreloaderPhrases(){
    this.text = localStorage.getItem("preloader");
    let rand = this.calculateRand();
    if(this.text){
      this.text = this.text[rand].content;
      return true;
    }else{
      return false;
    }
  }

}