import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import * as $ from 'jquery';
import { RestService } from 'src/app/datasource/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  private metaTitle = "კომპანია AutoR გთავაზობთ ავტომობილის შეკეთებას გამოძახებით";
  private csrf: string;

  constructor(private titleService: Title, private metaService: Meta, private RService: RestService) { }
  
  ngOnInit() {
    this.RService.get("").subscribe(
      (response) => {
        var preloader = localStorage.getItem("preloader");
        if(preloader){
          if(Array(preloader).length < Array(response.result.preloader).length){
              localStorage.removeItem("preloader");              
          }
        }
        localStorage.setItem("preloader", JSON.stringify(response.result.preloader));
      }
    );
    this.titleService.setTitle(this.metaTitle);
    this.metaService.addTags([
      {name: 'keywords', content: 'AutoR,ავტორ,კომპანია ავტორ,ავტო მომსახურება,ავტო სერვისი,ავტომობილის შეკეთება,გამოძახებით'},
      {name: 'description', content: 'კომპანია AutoR გთავაზობთ ავტომობილის შეკეთებას გამოძახებით, მოვალთ წავიყვანთ და გავაკეთებთ, დაგვიკავშირდით - ჩვენთან მარტივია'},
      {name: 'robots', content: 'index, follow'},
      {name: 'theme-color', content: '#b4fff5'},
      {name: 'msapplication-TileColor', content: '#b4fff5'}
    ]);    
  }   

  public makeOrder(){
    
    Swal.fire({
      title: 'მიუთითეთ თქვენი ',
      html: `<label>ტელეფონის ნომერი: <input id="phone" class="swal2-input" placeholder="599112233" max="9" min="9" /></label>`,
      focusConfirm: false,
      confirmButtonText: "გაგზავნა",
      showLoaderOnConfirm: true
    }).then(
      (result) => {
        const cMethod = "order";
        var $phone = $("#phone").val();
        $phone = $("#phone").val();
        if($phone.length === 9) {
          Swal.disableButtons();
          Swal.showLoading();
          var $vFD = new FormData();
          $vFD.append("phone", $phone);
          $vFD.append("csrf", this.csrf);
          this.RService.post(cMethod, $vFD).subscribe(
            (response) => {
              if(response.status == true) {
                Swal.hideLoading();
                Swal.fire({
                  title: 'ტრანზაქციის სტატუსი',
                  text: response.result,
                  icon: 'success',
                  showConfirmButton: false,
                  position: 'top-end',
                  timer: 2500
                });
              }
            },
            (error) => {
              Swal.hideLoading();
            }
          );
        }else{
          Swal.fire('','მიუთითეთ თქვენი ტელეფონის ნომერი!', 'warning');
        }
      },
      (error) => {
        Swal.fire('შეცდომა',error, 'error');
      }
    );

  }

}
