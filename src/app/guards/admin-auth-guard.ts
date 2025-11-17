import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router:Router=inject(Router)

  const isConnected = sessionStorage.getItem("connected");
  if (isConnected !== 'true') {
    router.navigate(['/login']);
  }
  return true;
};
