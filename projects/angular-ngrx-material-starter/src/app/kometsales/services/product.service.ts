import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = "http://localhost:8080//api/v1/";

  constructor(private httpClient: HttpClient) { }

  getProductsList(): Observable<Product[]>{
    
    return this.httpClient.get<Product[]>(this.baseUrl+"products");

  }

  //paginate and sorting services
  getProductsListPage(offset, limit, sort): Observable<any[]>{
    
    let params = new HttpParams();
    params = params.set('page', offset);
    params = params.set('size', limit);
    params = params.set('sort', sort);
    
    return this.httpClient.get<any[]>(this.baseUrl+"products/p?" + params.toString());

  }

  createProduct(product: Product): Observable<Object>{
   
    return this.httpClient.post(this.baseUrl+"products", product);
  }

  getProductById(id: number): Observable<Product>{

    return this.httpClient.get<Product>(this.baseUrl+"products/"+id)


  }

  updateProduct(id: number, product: Product): Observable<Object>{
    
    return this.httpClient.put(this.baseUrl+"products/"+id, product);
  }

  deleteProduct(id: number): Observable<Object>{
   
    return this.httpClient.delete(this.baseUrl+"products/"+id);
  }

  //File
  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
   
    const req = new HttpRequest('POST', `${this.baseUrl}products/u`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

}
