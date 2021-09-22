/* eslint-disable @typescript-eslint/prefer-for-of */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Observable} from 'rxjs/';
import { FieldMessage } from 'src/models/fieldmessage';
import { StorageService } from 'src/services/storage.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService, public alterCtrl: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
        .pipe(
            catchError((error, caught) => {
                let errorObj = error;
                if(errorObj.error)
                {
                    errorObj = errorObj.error;
                }
                if(!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }
                console.log('Erro detectado pelo interceptor:');
                console.log(errorObj);
                switch(errorObj.status){
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    case 422:
                        this.handle422(errorObj);
                        break;
                    default:
                        this.handleDefaultError(errorObj);
                }

                return Observable.throw(errorObj);
              })) as any;
    }
    handle422(errorObj){
        const alert = this.alterCtrl.create({
            message: 'Erro 422: Validação',
            subHeader: this.listErrors(errorObj.errors),
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.then();
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
    handle401(){
        const alert = this.alterCtrl.create({
            message: 'Erro 401: Falha na autenticação!!!',
            subHeader: 'Email ou senha incorretos!!!',
            backdropDismiss: false,
            buttons:[
                {
                    text: 'Ok'
                }
            ]
        });
        alert.then();
    }
    handleDefaultError(errorObj){
        const alert = this.alterCtrl.create({
            message: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            subHeader: errorObj.message,
            backdropDismiss: false,
            buttons:[
                {
                    text: 'Ok'
                }
            ]
        });
        alert.then();
    }
    private listErrors(messages: FieldMessage[]): string {
        let s = '';
        for (let i=0; i<messages.length; i++) {
            s = s + '<p> <strong>' + '</strong>: ' + messages[i].message + '</p>';
        }
        return s;
    }
}

export const errorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true
};
