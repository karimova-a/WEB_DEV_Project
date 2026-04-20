import {inject} from '@angular/core';
import {CanActivateFn , Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = ():boolean =>{
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if(auth.isLoggedIn()) return true;
  router.navigate(['/login']);
  return false;
}
