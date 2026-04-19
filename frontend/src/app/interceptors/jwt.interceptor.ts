import {HttpEvent, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
export const jwtInterceptor:HttpInterceptorFn = (req: HttpRequest<unknown>, next):Observable<HttpEvent<unknown>> =>{
  const token:string|null = localStorage.getItem('access_token');
  if(token){
    req = req.clone({
      setHeaders: {'Authorization': `Bearer ${token}`},
    })
  }
  return next(req);
};
