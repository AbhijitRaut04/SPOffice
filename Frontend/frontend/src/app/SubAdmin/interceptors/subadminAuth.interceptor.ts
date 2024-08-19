import { HttpInterceptorFn } from '@angular/common/http';

export const subadminAuthInterceptor: HttpInterceptorFn = (req, next) => {

    const token = localStorage.getItem('subadmin_token');

    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(clonedReq);
    }
  return next(req);

};


// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
//     const token = localStorage.getItem('subadmin_token');

//     if (token) {
//       console.log("cdsoocmksdmlks")
//       const clonedReq = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
//       return next.handle(clonedReq);
//     }

//     return next.handle(req);
//   }
// }
