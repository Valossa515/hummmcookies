import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { authInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { errorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/domain/cart.service';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { ProdutoService } from 'src/services/domain/produto.service';
import { StorageService } from 'src/services/storage.service';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./pages/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(AppComponent),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent
  ],
  exports: [RouterModule],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    authInterceptorProvider,
    errorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService
  ]
})
export class AppRoutingModule { }
