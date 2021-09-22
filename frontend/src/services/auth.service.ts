import { Injectable } from '@angular/core';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import  jwt_decode from 'jwt-decode';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';
;

@Injectable()
export class AuthService {
    jwtHelper: JwtHelperService = new JwtHelperService();
    constructor(public http: HttpClient,
        public storage: StorageService,
        public cartService: CartService) {

    }
    authenticated(cred: CredenciaisDTO) {
       return this.http.post(`${API_CONFIG.baseUrl}/login`, 
        cred,
        {
            observe: 'response',
            responseType: 'text'
        });
    }
    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,
         {},
         {
             observe: 'response',
             responseType: 'text'
         });
     }

    successfulLogin(authorizationValue: string)
    {
        const tok = authorizationValue.substring(7);
        const user: LocalUser = {
            token: tok,
            email: jwt_decode(tok),
            roles: jwt_decode(tok)
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout()
    {
        this.storage.setLocalUser(null);
    }
}
