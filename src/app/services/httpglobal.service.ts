import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class HttpGlobalService {

  header = null;
  
  constructor(private _http: HttpClient, private _toastr: ToastrService) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }


  loggedInUser(){
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getCall(url: any, data?: any){
    
    return this._http.get<any>(url, data)
  }
  
  postCall(url: any, data: any) {
    console.log("---post call---");
    console.log(url);
    return this._http.post<any>(url, data)
  }

  patchCall(url: any, data: any): Observable<any>{
    return this._http.patch<any>(url, data)
  }

  deletePost(url: any, id: number){
    return this._http.delete(url+'/'+id);
  }

  // Success Toaster message
  showSuccessToast(message, title){
    this._toastr.success(message, title)
  }

  // Error Toaster message
  showErrorToast(message, title){
    this._toastr.error(message, title)
  }

  // Post Image file
  postFile(fileToUpload: File) {
    const endpoint = 'http://localhost:3000/service/uploadImage';
    const formData: FormData = new FormData();
    formData.append('SERVICE_IMAGE', fileToUpload, fileToUpload.name);
    return this._http.post(endpoint, formData)
      // .map(() => { return true; })
      // .catch((e) => this.handleError(e));
  }

  
}
