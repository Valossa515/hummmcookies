import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { IonicErrorHandler } from 'ionic-angular';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { authInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { errorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { ProdutoService } from 'src/services/domain/produto.service';
import { CartService } from 'src/services/domain/cart.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(), AppRoutingModule],
  providers: [
    SplashScreen,
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    authInterceptorProvider,
    errorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
