import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductEditable{
  id:number;
  productname:string;
  description:string;
  quantite:number;
  price:number;
  costprice:number;
  currency:string;
  stockLevel:number;
  file:string;
  extensionfile:string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  saveproduct(url:any,data:any,file:File):Observable<any>{
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key].value));
    formData.append('file', file);
    const newRequest = new HttpRequest('POST', 'http://localhost:8080/v1/product', formData, {
    reportProgress: true,
    responseType: 'text'
    });
    console.log(formData)
    return this.http.request<any>(newRequest)
  }
  get_product_page(data:{size:number,page:number,sort_type:string,column:string,filtervalue:string},url:string) : Observable<any>{
    return this.http.get<any>(url+"?page="+data.page+"&size="+data.size+"&sort="+data.sort_type+"&column="+data.column+"&text="+data.filtervalue);
  }
  deleteproduct_ByListId(url:string,id:any[]){
    return this.http.delete(url+"?id="+id);
  }
  getproductbyId(url:string,id:string):Observable<ProductEditable>{
    return this.http.get<ProductEditable>(url+id);
  }
  updateproduct(url:string,data:any){
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    const newRequest = new HttpRequest('POST',url, formData, {
    reportProgress: true,
    responseType: 'json'
    });
    console.log(formData)
    return this.http.request<any>(newRequest)
  }
}
