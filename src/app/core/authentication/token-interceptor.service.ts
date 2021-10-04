import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpGlobalService } from '../../services/httpglobal.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _injector: Injector) { }

  intercept(req, next) {
    let gs = this._injector.get(HttpGlobalService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${gs.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
