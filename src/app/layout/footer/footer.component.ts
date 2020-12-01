import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { RestService } from 'src/app/datasource/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class LayoutFooterComponent implements OnInit {
  private method = "api";

  constructor(private RService: RestService) { }

  ngOnInit() {
  }

  public subscribeNewsLatter(){
    var $subscribe_email_address = $("#subscribe_email_address").val();
    var $vFD = new FormData();
    var $vCSRF = "";
    $vFD.append("email", $subscribe_email_address);
    $vFD.append("csrf", $vCSRF);
    this.RService.post(this.method, $vFD).subscribe(
      (response) => {
        
      },
      (error) => {
        
      });
  }

}
