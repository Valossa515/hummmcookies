import { Component, ViewChild } from '@angular/core';

import { AlertController, Platform, NavController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from 'src/services/storage.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(NavController) nav: NavController;
  currentPageTitle = 'Login';
  appPages = [
    {
      title: 'Login',
      url: '',
      icon: 'easel'
    },
    {
      title: 'Produtos',
      url: '/produtos',
      icon: 'film'
    },
    {
      title: 'Categorias',
      url: '/categorias',
      icon: 'settings'
    }
  ];

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public storage: StorageService,
    public auth: AuthService,
    public alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page: { title: string; component: string }) {
    const result = this.storage.getLocalUser().email;
    const roles = this.storage.getLocalUser().roles;
    if (result === 'nelio.iftm@gmail.com') {
      console.log('Ola, bem vindo: ', result, roles);
    }
    switch (page.title) {
      case 'Logout':
        this.auth.logout();
        this.nav.navigateRoot('HomePage');
        break;
      case 'Cadastro de Categorias':
        if (result !== 'nelio.iftm@gmail.com') {
          this.showInsertOk();
        }
        break;
      default:
        this.nav.navigateBack(page.component);
    }
  }
  showInsertOk() {
    const alert = this.alertCtrl.create({
      message: 'Acesso Negado!!!',
      subHeader: 'Desculpe mas você não tem permissão para entrar nesta página, faça login de administrador para ter acesso.',
     backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.nav.navigateRoot('HomePage');
          }
        }
      ]
    });
    alert.then();
  }

}
