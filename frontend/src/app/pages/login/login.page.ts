import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  cred: CredenciaisDTO = {
    email : ' ',
    senha : ' '
  };

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public hide: AppComponent) { }

  ngOnInit() {
  }

}
