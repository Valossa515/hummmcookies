import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from 'src/models/produto.dto';

@Injectable()
export class ProdutoService{
    constructor(public http: HttpClient){

    }

    findByCategoria(categoriaId: string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoriaId}`);
    }
    /*
    getSmallImageFromBucket(id: string): Observable<any>{
        const url = `${API_CONFIG.bucketBaseUrl}/prod${id}-smaill.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }
    */

    findById(produtoId: string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produtoId}`);
    }
    /*
    getImageFromBucket(id: string): Observable<any>{
        const url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }
    */
}
